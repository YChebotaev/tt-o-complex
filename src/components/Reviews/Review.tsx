import { type FC } from "react";
import sanitizeHtml from "sanitize-html";

export const Review: FC<{ text: string }> = ({ text }) => {
  const innerHTML = {
    __html: sanitizeHtml(text),
  };

  return (
    <div
      className="rounded-[15px] bg-light-gray p-[10px] text-black"
      dangerouslySetInnerHTML={innerHTML}
    />
  );
};
