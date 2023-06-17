import React from "react";
import type { NextPage } from "next";
import Link from "next/link";
import { Button as Btn } from "antd";

interface props {
  type: "submit" | "reset" | "button";
  classes: string;
  children: React.ReactNode;
  onClick?: () => void;
}

export const Button: React.FC<props> = ({
  type,
  classes,
  children,
  ...rest
}) => {
  return (
    <Btn
      htmlType={type}
      size="middle"
      className={`text-gray bg-secondary border-secondary hover:bg-secondary hover:text-gray hover:border-secondary focus:bg-secondary focus:text-gray focus:border-secondary ${classes}`}
      {...rest}
    >
      {children}
    </Btn>
  );
};
