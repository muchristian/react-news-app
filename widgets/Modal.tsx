import React, { Children } from "react";
import { Modal as MD } from "antd";
import { RightCircleOutlined } from "@ant-design/icons";
import { Button } from "../components/Button";

interface props {
  isVisible: boolean;
  title: string;
  children: JSX.Element;
  onCancel: () => void;
  width: number;
}

export const Modal: React.FC<props> = ({
  isVisible,
  children,
  onCancel,
  width,
}) => {
  return (
    <MD visible={isVisible} onCancel={onCancel} width={width}>
      <div className="modal-header px-[56px] py-[24px]">
        <h2 className="text-primary text-4xl font-bold">Filter Articles</h2>
        <p className="text-primary/80">Filter news of your desire</p>
      </div>
      {children}
    </MD>
  );
};
