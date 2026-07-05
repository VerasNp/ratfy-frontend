"use client";

import Player from "@/components/generics/Player";
import CardTest from "./test/CardTest";
import ContentPageTest from "./test/ContentPageTest";
import Sidebar from "@/components/generics/Sidebar"



export default function Home() {

  return (
          <div className="flex flex-col overflow-y-scroll">
            <ContentPageTest/>
            <CardTest/>
          </div>
  );
}
