import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { isValidToken } from "../utils/jwt";
import { removeCredentials, setCredentials } from "../redux/slices/auth.slice";
import { baseApi } from "../utils/baseUrl";

const WithPrivateRoute = (Wrapped: any) => {
  return (props: any) => {
    const dispatch = useDispatch();
    const token = useSelector((state: RootState) => state.auth.authToken);

    useEffect(() => {
      const router = require("next/router").default;
      const localToken =
        typeof window !== "undefined" && localStorage.getItem("_news_web_tkn_");

      if (!token && localToken) {
        dispatch(setCredentials({ authToken: localToken }));
      }

      if (!token && !localToken) {
        dispatch(removeCredentials());
        dispatch(baseApi.util.resetApiState());
        router.replace("/login");
      }

      if (
        (token && !isValidToken(token)) ||
        (localToken && !isValidToken(localToken))
      ) {
        dispatch(removeCredentials());
        dispatch(baseApi.util.resetApiState());
        router.replace("/login");
      }
    }, []);

    if (!token) {
      // Render null or a loading state while validating authentication
      return null;
    }

    return <Wrapped {...props} />;
  };
};

export default WithPrivateRoute;
