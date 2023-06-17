import type { NextPage } from "next";
import React from "react";
import { LockOutlined } from "@ant-design/icons";
import { Input, Select, TextArea, Search } from "../components/Form";
import Link from "next/link";

type props = {
  openDrawer: () => void;
  user: any;
  logout: () => void;
};

const Navbar: React.FC<props> = ({ openDrawer, user, logout }) => {
  return (
    <div className="fixed bg-[transparent] h-[80px] w-full z-50">
      <div className="container h-full flex flex-col justify-center px-[16px] md:px-[0]">
        <div className="flex justify-between">
          <nav className="menu">
            <ul className="flex">
              <li className="text-primary  hover:text-secondary">
                <Link href="#">
                  <a onClick={openDrawer}>Preference</a>
                </Link>
              </li>
            </ul>
          </nav>
          <div className="flex gap-[16px]">
            <p className="text-primary">{user && user.email}</p>
            <p className="text-primary cursor-pointer" onClick={logout}>
              logout
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
