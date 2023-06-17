import React, { Children } from "react";
import { Drawer as DR } from "antd";

interface props {
  title: string;
  open: boolean;
  placement?: "top" | "right" | "bottom" | "left";
  onClose: () => void;
  children: JSX.Element;
}

const Drawer: React.FC<props> = ({
  title,
  open,
  placement,
  onClose,
  children,
}) => {
  return (
    <DR
      title={title}
      placement={placement}
      closable={false}
      onClose={onClose}
      visible={open}
      key={placement}
    >
      {children}
    </DR>
  );
};

export default Drawer;
