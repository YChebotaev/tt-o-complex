import { type FC } from "react";

export const PageHeader: FC<{ children: string }> = ({ children }) => (
  <div className="max-w-[1442px] m-auto">
    <div className="flex items-center justify-center p-[14px]">
      <div className="bg-neutral-gray text-[40px] md:text-[96px] rounded-[15px] w-full text-center text-lightest-gray">
        {children}
      </div>
    </div>
  </div>
);
