import router from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { removeCredentials } from "../redux/slices/auth.slice";
import { useLazyLogoutQuery } from "../services/auth";
import { baseApi } from "../utils/baseUrl";
import jwt from "jsonwebtoken";
import { ToastRender } from "../utils/toast";
import Navbar from "../widgets/Navbar";

interface props {
  children: JSX.Element;
  title?: string;
  user: any;
  openDrawer: () => void;
  logout: () => void;
}

const Authenticated: React.FC<props> = ({
  children,
  title,
  openDrawer,
  user,
  logout,
}) => {
  return (
    <>
      <div className="w-full h-screen flex flex-col bg-background1">
        <Navbar openDrawer={openDrawer} user={user} logout={logout} />
        <main className="w-full mt-[80px]">
          <div className="container flex flex-col gap-[16px] px-[16px] md:px-[0]">
            {children}
          </div>
        </main>
      </div>
    </>
  );
};

export default React.memo(Authenticated);
