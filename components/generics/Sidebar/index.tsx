import React from "react";
import Container from "../Container/index";
import Card from "../Card/index";
import Text from "../Text/index";

export default function Sidebar() {
  return (
    <aside className="w-[300px] h-full flex flex-col gap-2 bg-black p-2 overflow-hidden">
      
      {/* 1. MÓDULO SUPERIOR: Navegação Principal */}
      <Container className="flex-col bg-[#121212] rounded-lg p-4">
        {/* Simulando os botões de Início e Busca */}
        <div className="flex items-center gap-4 cursor-pointer hover:text-white text-[#a7a7a7] transition-colors font-bold mb-4">
           {/* <Home size={24} /> */}
           <Text textString="Início" size="base" color="inherit" weight="bold" />
        </div>
        <div className="flex items-center gap-4 cursor-pointer hover:text-white text-[#a7a7a7] transition-colors font-bold">
           {/* <Search size={24} /> */}
           <Text textString="Buscar" size="base" color="inherit" weight="bold" />
        </div>
      </Container>

      {/* 2. MÓDULO INFERIOR: Sua Biblioteca */}
      <Container className="flex-col bg-[#121212] rounded-lg flex-1 overflow-hidden p-2">
        
        {/* Cabeçalho da Biblioteca */}
        <div className="flex items-center gap-4 p-2 text-[#a7a7a7] hover:text-white cursor-pointer transition-colors">
          {/* <Library size={24} /> */}
          <Text textString="Sua Biblioteca" size="base" color="inherit" weight="bold" />
        </div>

        {/* Filtros (Playlists, Artistas) - Simulados com divs simples */}
        <div className="flex gap-2 px-2 py-2">
          <span className="bg-[#2a2a2a] text-white text-sm px-3 py-1 rounded-full cursor-pointer hover:bg-[#333]">Playlists</span>
          <span className="bg-[#2a2a2a] text-white text-sm px-3 py-1 rounded-full cursor-pointer hover:bg-[#333]">Artistas</span>
        </div>

        {/* Área de Rolagem da Biblioteca 
          Aqui é onde o seu componente genérico CARD brilha!
        */}
        <div className="flex flex-col gap-1 overflow-y-auto h-full mt-2 custom-scrollbar">
          
          <Card 
            type="horizontal"
            title="Músicas Curtidas"
            subtitle="Playlist • 120 músicas"
            imageSrc="/liked-songs-placeholder.jpg" // Coloque o caminho real
            imageShape="square"
            className="bg-transparent hover:bg-[#1a1a1a]" // Sobrescrevemos o fundo para ficar invisível até o hover
          />

          <Card 
            type="horizontal"
            title="Rock Classics"
            subtitle="Playlist • Spotify"
            imageSrc="/rock-cover.jpg"
            imageShape="square"
            className="bg-transparent hover:bg-[#1a1a1a]"
          />

          <Card 
            type="horizontal"
            title="Linkin Park"
            subtitle="Artista"
            imageSrc="/linkin-park-avatar.jpg"
            imageShape="circle" // Formato redondo para artista!
            className="bg-transparent hover:bg-[#1a1a1a]"
          />

          <Card 
            type="horizontal"
            title="Sertanejo 2026"
            subtitle="Playlist • João Silva"
            imageSrc="/sertanejo.jpg"
            imageShape="square"
            className="bg-transparent hover:bg-[#1a1a1a]"
          />

        </div>
      </Container>
    </aside>
  );
}