import type { NextPage } from "next";
import React, { ReactNode } from "react";
import { EditOutlined, LockOutlined } from "@ant-design/icons";
import { Input, Select, TextArea, Search } from "../components/Form";
import Link from "next/link";
import { Drawer as Drw } from "antd";

type props = {
  title?: string;
  placement?: any;
  open: boolean;
  children: ReactNode;
  closeDrawer: () => void;
  editHandler: () => void;
};

const Drawer: React.FC<props> = ({
  title,
  open,
  placement = "left",
  children,
  closeDrawer,
  editHandler,
}) => {
  return (
    <Drw
      title={title}
      placement={placement}
      closable={false}
      onClose={closeDrawer}
      open={open}
      key={placement}
    >
      <div className="drawer-body">
        <div className="drawer-header flex flex-col gap-[16px]">
          <div className="flex justify-between items-center">
            <h2 className="text-primary text-4xl font-bold">Settings</h2>
            <EditOutlined
              className="text-primary text-[24px]"
              onClick={editHandler}
            />
          </div>
          <p className="text-primary/80">Set up your news preference</p>
        </div>
        {children}
      </div>
    </Drw>
  );
};

export default Drawer;
