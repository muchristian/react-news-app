import React from "react";
import Image from "next/image";

interface props {
  title: string;
  description?: string;
  url: string;
  image: string;
  category?: string;
  source?: string;
  author?: string;
  date: string;
}

const Item: React.FC<props> = ({
  title,
  description,
  url,
  image,
  category,
  source,
  author,
  date,
}) => {
  return (
    <div className="relative flex flex-col gap-4" key={title}>
      <div className="relative h-[280px] md:h-[250px] lg:h-[226px]">
        {image ? (
          <img src={image} className="h-full bg-cover w-full" />
        ) : (
          <img
            src="/No_Image_Available.jpg"
            className="h-full bg-cover w-full"
          />
        )}
      </div>

      <div className="flex flex-col gap-3">
        <p>
          <span className="text-xs text-primary/60">{source}</span>
          <span className="text-xs text-primary/60"> - </span>
          <span className="text-xs text-primary/60">{date?.split("T")[0]}</span>
        </p>
        <a href={url} target="_blank" className="text-xl text-primary">
          {title}
        </a>
        <p className="text-xs text-primary line-clamp-3 leading-5 max-h-[60px] overflow-hidden">
          {description}
        </p>
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <h6 className="text-sm text-primary">
              Written by
              <span className="text-secondary"> {author || "unknown"}</span>
            </h6>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Item;
