"use client";

import React from "react";
import { Home, Search, Library, ArrowDownCircle, Bell, Users, Music } from "lucide-react";
import Button from "../Button";
import InputText from "../InputText";
import Text from "../Text";
import Icon from "../Icon";
import Image from "../Image";

export default function NavBar() {
  return (
    <header className="flex items-center justify-between px-6 py-2 w-full bg-black">
      
      <div className="shrink-0 cursor-pointer hover:scale-105 transition-transform duration-200">
        {/* TODO: Substituir ícone por logo quando tivermos uma. */}
        <Icon src={Music} size={32} className="text-white" />
      </div>

      <div className="flex items-center gap-2 flex-1 justify-center max-w-2xl">
        <Button variant="ghost" size="icon" label="Home" className="w-12 h-12 bg-bg-elevated-highlight hover:scale-105 transition-transform duration-200 text-white rounded-full">
            <Icon src={Home} size={24} />
        </Button>

        <div className="w-full max-w-[450px]">
          <InputText variant="rounded" size="md" placeholder="What do you want to play?" leftIcon={Search} rightIcon={{ icon: Library, action: "button" }} clearable fullWidth/>
        </div>
      </div>

      <div className="flex items-center gap-6 text-text-secondary">

        <Button variant="primary" size="sm" className="whitespace-nowrap hover:scale-105 transition-transform duration-200">
          <Text textString="Explore Premium" size="sm" weigth="bold" />
        </Button>

        <div className="flex items-center gap-1.5 cursor-pointer hover:text-white transition-colors duration-200 font-semibold text-sm">
          <Icon src={ArrowDownCircle} size={20} />
          <Text textString="Install App" size="sm" weigth="bold" color="--text-secondary" hoverColor="--text-primary"/>
        </div>

        <div className="flex items-center gap-4">
          <button className="hover:text-white transition-colors duration-200 cursor-pointer" aria-label="Notifications">
            <Icon src={Bell} size={18} />
          </button>
          <button className="hover:text-white transition-colors duration-200 cursor-pointer" aria-label="Friend Activity">
            <Icon src={Users} size={18} />
          </button>
        </div>

        <div className="flex items-center justify-center p-1 rounded-full bg-black cursor-pointer hover:scale-105 transition-transform duration-200">
        <Image src="/avatar.png" alt="Foto de perfil do usuário" size={32} className="rounded-full"/>
        </div>
        
      </div>
    </header>
  );
}