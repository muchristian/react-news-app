import React from "react";
import Link from "next/link";
import Image from "next/image";

interface props {
  title: string;
  selectHandler: (value: string) => void;
}

const Category: React.FC<props> = ({ title, selectHandler }) => {
  return (
    <Link href="">
      <a
        className="text-primary px-3 py-1.5 rounded-[24px] border border-primary hover:border-secondary"
        onClick={() => selectHandler(title)}
      >
        {title}
      </a>
    </Link>
  );
};

export default Category;
