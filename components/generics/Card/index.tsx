import Icon from "../Icon";
import Image from "../Image/index";
import Text from "../Text/index";
import Dropdown from "../Dropdown"; // Adjust path if necessary
import PinnedPlaceholder from "../../../public/pin.svg";
import { StaticImageData } from "next/image";
import { MoreHorizontal } from "lucide-react"; // Make sure to import this

// Define the shape of a dropdown item based on your Dropdown component
export interface DropdownItem {
  id: string;
  icon?: React.ReactNode;
  item: React.ReactNode;
  onSelect: () => void;
}

interface CardProps {
  imageSrc: string | StaticImageData;
  subtitle: string;
  imageBorder?: "squared" | "rounded" | "circle";
  imageSize?: number;
  className?: string;
  orientation?: "vertical" | "horizontal";
  cardType?: "Album" | "Playlist" | "Artist" | "Single" | "";
  cardOwner?: string[] | string;
  width?: number | string;
  height?: number | string;
  title: string;
  titleSize?: string;
  subtitleSize?: string;
  children?: React.ReactNode;
  hoverBgColor?: string;
  bgColor?: string;
  hoverMask?: string;
  linkRedirect?: string;
  isPinned?: boolean;
  dropdownItems?: DropdownItem[]; // <-- New Prop added here
}

export default function Card({
  title,
  titleSize = "16px",
  subtitle,
  bgColor = "var(--bg-main)",
  hoverBgColor = "var(--bg-highlight)",
  subtitleSize = "14px",
  imageSrc,
  cardType = "Playlist",
  cardOwner = [],
  imageBorder = "rounded",
  imageSize = 160,
  width = "",
  height = "",
  orientation = "vertical",
  className = "",
  isPinned = false,
  dropdownItems, // <-- Destructured here
  children,
  ...extra
}: CardProps) {
  const layoutClasses = {
    vertical: `flex flex-none flex-col items-start pt-2 gap-2`,
    horizontal: `flex flex-row items-center px-2 py-2 gap-2 w-full h-[72px]`,
  };

  const separator = cardType === "Artist" || cardType === "" ? "" : `\u{00B7}`;
  cardOwner = cardType === "Artist" ? [] : cardOwner;
  const aux = cardType === "Single" ? `Song ${separator} ${cardOwner}` : `${cardType} ${separator} ${cardOwner}`;
  const cardBorder = cardType === "Artist" ? "circle" : "rounded";

  const subtitleVar =
    orientation === "vertical" && Array.isArray(cardOwner) && cardOwner.length > 0
      ? cardOwner.join(" , ")
      : ` ${aux}`;

  const pinnedVisibility = isPinned === false ? "hidden" : "";

  const verticalClasses = orientation === "vertical"
    ? { width: "198px", height: "256px" }
    : { maxHeight: "64px" };

  const clampChars = (text: string, max: number) =>
    text.length > max ? text.slice(0, max) + "…" : text;

  return (
    <div
      className={`relative group ${layoutClasses[orientation]} bg-[${bgColor}] hover:bg-[${hoverBgColor}] cursor-pointer ${className}`}
      style={verticalClasses}
    >
      <div className="flex shrink-0 self-center">
        <Image
          src={imageSrc}
          alt={`Capa de ${title}`}
          size={orientation === "horizontal" ? 56 : imageSize}
          shape={cardBorder}
        />
      </div>

      <div className={`w-full min-w-0 overflow-hidden ${orientation === "vertical" ? "px-4" : "p-1"}`}>
        <div className={orientation === "horizontal" ? "line-clamp-1" : "line-clamp-2"}>
          <Text
            textString={clampChars(title, 32)}
            size={titleSize}
            weight="bold"
            color="#eeeeee"
            cursor="pointer"
          />
        </div>
        <div className="flex gap-1 w-full min-w-0 overflow-hidden">
          <Icon
            src={PinnedPlaceholder}
            className={`shrink-0 size-4 ${pinnedVisibility}`}
            color="#1ed760"
          />
          <div className={`w-full ${orientation === "horizontal" ? "line-clamp-1" : "line-clamp-2"}`}>
            <Text textString={clampChars(subtitleVar, 56)} cursor="pointer" size={subtitleSize} color="#aaaaaa" />
          </div>
        </div>
      </div>

      {dropdownItems && dropdownItems.length > 0 && (
        <div
          className="absolute top-2 left-0 w-full px-2 opacity-0 group-hover:opacity-100 transition-opacity z-20"
          onClick={(e) => e.stopPropagation()}
        >
          <Dropdown
            triggerComponent={
              <div className="w-full ml-auto flex justify-center items-center bg-black/70 backdrop-blur-md rounded-md p-1 cursor-pointer">
                <MoreHorizontal
                  size={20}
                  className="text-white hover:text-green-400 transition-colors"
                />
              </div>
            }
            items={dropdownItems}
          />
        </div>
      )}

      {children}
    </div>
  );
}
