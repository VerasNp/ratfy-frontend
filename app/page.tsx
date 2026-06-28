"use client";

import { useState } from "react";
import Player, { Track } from "@/components/generics/Player";
import PlayerTest from "./test/PlayerTest";
import CardTest from "./test/CardTest";

export default function Home() {

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white pb-32">
      <CardTest></CardTest>
      <PlayerTest></PlayerTest>
    </main>
  );
}
