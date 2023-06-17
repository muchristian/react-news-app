import React, { useCallback, useEffect, useState } from "react";
import Unauthenticated from "../../layouts/Unauthenticated";
import Link from "next/link";
import { Button } from "../../components/Button";
import { Input } from "../../components/Form";
import { Form } from "antd";
import * as Yup from "yup";
import { NextPage } from "next";
import { useLoginMutation } from "../../services/auth";
import { login } from "../../utils/models";
import { ToastRender } from "../../utils/toast";
import WithPublicRoute from "../../HOC/WithPublicRoute";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../redux/slices/auth.slice";
import { useRouter } from "next/router";

interface formValues {
  email: string;
  password: string;
}

const Login: NextPage = () => {
  const router = useRouter();
  const path = router.asPath;
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const initialValues: formValues = { email: "", password: "" };
  const [login, { data: loginResponse, error: loginError }] =
    useLoginMutation();

  const validationSchema = {
    email: {
      required: true,
      message: "Invalid Email",
    },
    password: {
      required: true,
      message: "Invalid Password",
    },
  };

  const onFinishedLogin = async (values: login) => {
    try {
      const result = await login(values).unwrap();
      dispatch(setCredentials({ authToken: result.data.access_token }));
      ToastRender(result.message);
    } catch (error: any) {
      const { message } = error.data;
      ToastRender(message, true);
    }
  };
  return (
    <Unauthenticated>
      <div className="bg-sidebar1 p-[64px] border border-primary/10 rounded">
        <div className="flex flex-col gap-[48px]">
          <h1 className="font-bold text-2xl text-secondary">NEWS-APP</h1>
          <div className="flex flex-col gap-[16px]">
            <h2 className="font-semibold text-primary text-lg text-normal">
              Login
            </h2>
            <p className="text-active text-primary">
              Fill out this form to login
            </p>
          </div>
          <Form
            layout="vertical"
            initialValues={initialValues}
            autoComplete="off"
            form={form}
            onFinish={onFinishedLogin}
            className="flex flex-col gap-[32px]"
          >
            <div className="flex flex-col gap-[16px]">
              <Input
                type="email"
                name="email"
                label="Email Address"
                placeholder="johndoe@mail.com"
                rules={[validationSchema.email]}
              />
              <Input
                type="password"
                name="password"
                label="Password"
                placeholder="password"
                rules={[validationSchema.password]}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Button classes="button block w-full" type="submit">
                <>Login</>
              </Button>
              <span>
                Don't have an account?{" "}
                <Link href="/signup">
                  <a>Signup</a>
                </Link>
              </span>
            </div>
          </Form>
        </div>
      </div>
    </Unauthenticated>
  );
};

export default WithPublicRoute(Login);
