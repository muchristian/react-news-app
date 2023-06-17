import { Form, Select as Slt, Tooltip } from "antd";
import moment, { Moment } from "moment";
import type { NextPage } from "next";
import { ReactElement, useEffect, useState } from "react";
import WithPrivateRoute from "../HOC/WithPrivateRoute";
import Authenticated from "../layouts/Authenticated";
import Category from "../components/Category";
import Item from "../components/Item";
import { Button } from "../components/Button";
import { Date, Input, Search, Select } from "../components/Form";
import { Modal } from "../widgets/Modal";
import { useGetArticlesQuery } from "../services/article";
import { Loader } from "../components/Loader/Loader";
import Drawer from "../widgets/Drawer";
import { disabledDate } from "../utils/date";
import { ToastRender } from "../utils/toast";
import {
  useGetPreferencesQuery,
  usePostPreferenceMutation,
} from "../services/preference";
import { RightCircleOutlined } from "@ant-design/icons";
import { useLazyLogoutQuery, useLazyMeQuery } from "../services/auth";
import { removeCredentials } from "../redux/slices/auth.slice";
import { baseApi } from "../utils/baseUrl";
import { useDispatch } from "react-redux";
import router from "next/router";
import {
  useGetCategoryReferencesQuery,
  useLazyGetAuthorReferencesQuery,
  useLazyGetSourceReferencesQuery,
} from "../services/reference";
const { Option } = Slt;
interface searchValues {
  search: string;
}
interface filterValues {
  date: string;
  source: string;
}

interface preferenceValues {
  categories: string[];
  sources: string[];
  authors: string[];
}

interface preferenceInitValues {
  preference: [];
}

const Home: NextPage = () => {
  const [preferenceForm] = Form.useForm();
  const [filterForm] = Form.useForm();
  const [getUser] = useLazyMeQuery();
  const dispatch = useDispatch();
  const [triggerLogout] = useLazyLogoutQuery();

  // user states
  const [user, setUser] = useState<any>();

  // preference states
  const [open, setOpen] = useState(false);
  const [editPreference, setEditPreference] = useState(true);
  const [preferenceInitialValues, setPreference] = useState<preferenceValues>({
    categories: [],
    sources: [],
    authors: [],
  });
  const [savePreference] = usePostPreferenceMutation();
  const {
    data: preferences,
    isLoading: isGetPreferencesLoading,
    isFetching: isPreferencesFetching,
  } = useGetPreferencesQuery();

  // reference states
  const {
    data: referencesCategories,
    isLoading: isGetCategoriesLoading,
    isFetching: isGetCategoriesFetching,
  } = useGetCategoryReferencesQuery();
  const [getSources, { data: sourceReferences }] =
    useLazyGetSourceReferencesQuery();
  const [getAuthors, { data: authorReferences }] =
    useLazyGetAuthorReferencesQuery();

  // filter states
  const [search, setSearch] = useState<searchValues["search"]>("");
  const [filterInitValues, setFilterInitValues] = useState<filterValues>({
    date: "",
    source: "",
  });
  const [isFilterPreferenceModalVisible, setFilterPreferenceModalVisible] =
    useState(false);

  // user handler
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userInfo = await getUser();
        setUser(userInfo.data.data);
      } catch (error) {
        console.error("error", error);
      }
    };
    fetchUserInfo();
  }, []);

  const handleLogout = async () => {
    try {
      await triggerLogout();
      dispatch(removeCredentials());
      dispatch(baseApi.util.resetApiState());
      router.replace("/login");
    } catch (error: any) {
      ToastRender(error, true);
    }
  };

  // preference handler
  const toggleDrawer = () => {
    loadReferences();
    setOpen(!open);
  };
  const editPreferenceHandler = () => {
    setEditPreference(!editPreference);
  };
  const preferenceSelectionHandler = (
    name: "categories" | "sources" | "authors",
    value: string
  ) => {
    setPreference({
      ...preferenceInitialValues,
      [name]: [...preferenceInitialValues[name], value],
    });
  };

  const preferenceDeSelectionHandler = (
    name: "categories" | "sources" | "authors",
    value: string
  ) => {
    setPreference({
      ...preferenceInitialValues,
      [name]: preferenceInitialValues[name].filter((el) => el != value),
    });
  };

  const savePreferencesHandler = async (values: any) => {
    try {
      const result = await savePreference(values).unwrap();
      preferenceForm.resetFields();
      ToastRender(result.message);
    } catch (error: any) {
      const { message } = error.data;
      ToastRender(message, true);
    }
  };

  useEffect(() => {
    if (preferences) {
      setPreference((prevValues) => ({
        ...prevValues,
        categories: [
          ...prevValues.categories,
          ...preferences.data["categories"].map(
            (category: { category: string }) => category.category
          ),
        ],
        sources: [
          ...prevValues.sources,
          ...preferences.data["sources"].map(
            (source: { source: string }) => source.source
          ),
        ],
        authors: [
          ...prevValues.authors,
          ...preferences.data["authors"].map(
            (author: { author: string }) => author.author
          ),
        ],
      }));
    }
  }, [preferences]);

  const formattedReferences = (reference?: { name: string }[]) => {
    if (reference) {
      return reference.map((ref) => ({
        label: ref.name,
        value: ref.name,
      }));
    }
  };

  const togglePreferenceModal = () => {
    setFilterPreferenceModalVisible(!isFilterPreferenceModalVisible);
  };

  const {
    data: articles,
    isLoading: isArticleLoading,
    isFetching: isArticleFetching,
  } = useGetArticlesQuery({
    search,
    date: filterInitValues["date"],
    source: filterInitValues["source"],
  });

  const onFilter = async (values: any) => {
    setFilterInitValues({
      ...values,
      date: moment(values.date).format("YYYY-MM-DD").toString(),
    });
  };

  const handleSearch = (el: any) => {
    setSearch(el.target.value);
  };

  const handleCategorySelection = (value: string) => {
    setSearch(value);
  };

  const clearFilter = () => {
    setSearch("");
    setFilterInitValues({ date: "", source: "" });
    filterForm.setFieldsValue({ date: "" });
    filterForm.setFieldsValue({ source: "" });
  };

  const handleNewsFilterToggle = async () => {
    if (!sourceReferences) {
      getSources();
    }
    setFilterPreferenceModalVisible(!isFilterPreferenceModalVisible);
  };
  // reference handler
  const loadReferences = () => {
    if (!sourceReferences) {
      getSources();
    }
    if (!authorReferences) {
      getAuthors();
    }
  };
  return (
    <Authenticated
      title="Home"
      openDrawer={toggleDrawer}
      user={user}
      logout={handleLogout}
    >
      <>
        <Drawer
          title=""
          open={open}
          editHandler={editPreferenceHandler}
          closeDrawer={toggleDrawer}
        >
          <Form
            layout="vertical"
            initialValues={preferenceInitialValues}
            autoComplete="off"
            form={preferenceForm}
            onFinish={savePreferencesHandler}
            className="flex flex-col gap-[32px]"
          >
            <div className="flex flex-col gap-[16px]">
              <Select
                mode="multiple"
                allowClear={true}
                name="categories"
                label="Categories"
                placeholder="categories"
                disabled={editPreference}
                onSelect={(value) =>
                  preferenceSelectionHandler("categories", value)
                }
                onDeselect={(value) =>
                  preferenceDeSelectionHandler("categories", value)
                }
                options={formattedReferences(referencesCategories?.data)}
              />
              <Select
                mode="multiple"
                allowClear={true}
                name="sources"
                label="Sources"
                placeholder="sources"
                disabled={editPreference}
                onSelect={(value) =>
                  preferenceSelectionHandler("sources", value)
                }
                onDeselect={(value) =>
                  preferenceDeSelectionHandler("sources", value)
                }
                options={formattedReferences(sourceReferences?.data)}
              />
              <Select
                mode="multiple"
                allowClear={true}
                name="authors"
                label="Authors"
                placeholder="authors"
                disabled={editPreference}
                onSelect={(value) =>
                  preferenceSelectionHandler("authors", value)
                }
                onDeselect={(value) =>
                  preferenceDeSelectionHandler("authors", value)
                }
                options={formattedReferences(authorReferences?.data)}
              />
            </div>
            {!editPreference && (
              <Button classes="button block w-full" type="submit">
                <>Submit</>
              </Button>
            )}
          </Form>
        </Drawer>
        <Modal
          isVisible={isFilterPreferenceModalVisible}
          title=""
          onCancel={togglePreferenceModal}
          width={768}
        >
          <Form
            layout="vertical"
            initialValues={filterInitValues}
            autoComplete="off"
            form={filterForm}
            onFinish={onFilter}
          >
            <div className="modal-body px-[56px] py-[24px] grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Date
                name="date"
                label="Date"
                placeholder="2022-01-01"
                format="YYYY-MM-DD"
                disabledDate={disabledDate}
              />
              <Select
                name="sources"
                label="Source"
                placeholder="Source"
                options={formattedReferences(sourceReferences?.data)}
              />
            </div>
            <div className="modal-footer px-[56px] py-[24px]">
              <Button
                classes="button block bg-secondary border-secondary hover:bg-secondary hover:text-[#000000] hover:border-secondary focus:bg-secondary focus:text-[#000000] focus:border-secondary"
                type="submit"
              >
                <>Submit</>
              </Button>
            </div>
          </Form>
        </Modal>
        <section className="w-full py-4">
          <div className="flex justify-between items-center">
            <h3 className="text-primary/80 text-4xl font-bold">
              News{" "}
              {search ||
              filterInitValues["date"] ||
              filterInitValues["source"] ? (
                <p
                  className="text-sm font-normal hover:text-secondary cursor-pointer"
                  onClick={clearFilter}
                >
                  clear filter
                </p>
              ) : (
                ""
              )}
            </h3>
            <div className="relative search-input">
              <Search
                name="search"
                placeholder="Search Income, Expense..."
                onChange={(el: any) => handleSearch(el)}
                classes={"search"}
                suffix={
                  <svg
                    aria-hidden="true"
                    className="w-5 text-primary/60"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    ></path>
                  </svg>
                }
              />
            </div>
          </div>
        </section>

        <section className="w-full flex flex-col md:flex-row md:justify-between md:items-center py-4">
          <div className="overflow-x-auto">
            <div className="flex gap-2">
              <>
                {preferences?.data["categories"].length > 0 ? (
                  <>
                    {preferences?.data["categories"].map((p: any) => (
                      <Category
                        title={p.category}
                        key={p.category}
                        selectHandler={handleCategorySelection}
                      />
                    ))}
                  </>
                ) : (
                  <>
                    {referencesCategories?.data.map((p: any) => (
                      <Category
                        title={p.name}
                        key={p.name}
                        selectHandler={handleCategorySelection}
                      />
                    ))}
                  </>
                )}
              </>
            </div>
          </div>
          <div className="flex gap-4 self-end">
            <Tooltip title="Refresh for more updates">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="32"
                viewBox="0 -960 960 960"
                width="32"
                className="fill-primary/80 -mt-1 cursor-pointer"
              >
                <path d="M480-160q-133 0-226.5-93.5T160-480q0-133 93.5-226.5T480-800q85 0 149 34.5T740-671v-129h60v254H546v-60h168q-38-60-97-97t-137-37q-109 0-184.5 75.5T220-480q0 109 75.5 184.5T480-220q83 0 152-47.5T728-393h62q-29 105-115 169t-195 64Z" />
              </svg>
            </Tooltip>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="32"
              viewBox="0 -960 960 960"
              width="32"
              className="fill-primary/80 -mt-1 cursor-pointer"
              onClick={handleNewsFilterToggle}
            >
              <path d="M400-240v-60h160v60H400ZM240-450v-60h480v60H240ZM120-660v-60h720v60H120Z" />
            </svg>
          </div>
        </section>

        <section className="w-full py-4">
          <Loader
            loading={isArticleLoading || isArticleFetching}
            data={articles?.data.data}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-6">
              {articles?.data.data.map((article: any) => (
                <Item
                  title={article["title"]}
                  description={article["description"]}
                  url={article["url"]}
                  date={article["publishedAt"]}
                  author={article["author"]}
                  image={article["thumbnail"]}
                  key={article["title"]}
                  source={article["sourceName"]}
                />
              ))}
            </div>
          </Loader>
        </section>
      </>
    </Authenticated>
  );
};

export default WithPrivateRoute(Home);
