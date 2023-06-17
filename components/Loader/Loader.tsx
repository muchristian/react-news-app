import React from "react";
import type { NextPage } from "next";
import Link from "next/link";
import { Empty, Skeleton } from "antd";

interface props {
  data: any;
  loading: boolean;
  children: JSX.Element;
}

export const Loader: React.FC<props> = ({
  data,
  loading,
  children,
  ...rest
}) => {
  return (
    <>
      {loading ? (
        <Skeleton active />
      ) : (
        <>
          {data?.length > 0 ? (
            children
          ) : (
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          )}
        </>
      )}
    </>
  );
};
