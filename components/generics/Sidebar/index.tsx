import React from "react";
import Container from "../Container/index";
import Card from "../Card/index";
import Text from "../Text/index";
import FilterBar from "../Sidebar/filterBar";
import Placeholder from "../../../public/placeholder_1024.jpg";
import { ReactNode,
 } from "react";
export default function Sidebar(
    {children,} : {chilldren: React.ReactNode}  
) {
  return (
    <aside className="w-[320px] h-full flex flex-col gap-2 border-2 border-black rounded-md p-1 overflow-hidden h-screen">
      <Container className="flex-row bg-[#121212] rounded-lg p-1">
        <div className="flex items-center gap-4 pl-1 cursor-pointer hover:text-white text-[#a7a7a7] transition-colors mb-4">
          <Text
            textString="Your Library"
            size="2xl"
            color="inherit"
            weight="bold"
          />
        </div>
        <div className="flex gap-2 pl-2 py-2 w-full">
            <FilterBar></FilterBar>
        </div>
        <div className="flex flex-col gap-1 overflow-y-auto w-full h-full mt-2 custom-scrollbar">
          {children}
        </div>
      </Container>
    </aside>
  );
}
