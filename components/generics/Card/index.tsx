import Icon from "../Icon";
import Image from "../Image/index";
import Text from "../Text/index";
import PinnedPlaceholder from "../../../public/pin.svg"
interface CardProps {
  imageSrc: string;
  subtitle: string;
  imageBorder?: "squared" | "rounded" | "circle";
  imageSize?: number;
  className?: string;
  orientation?: "vertical" | "horizontal";
  cardType?: "Album" | "Playlist" | "Artist" | "Single" | "";
  cardOwner?: string[];
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
}

export default function Card({
  title,
  titleSize = "15px",
  subtitle,
  bgColor= "var(--bg-main)",
  hoverBgColor= "var(--bg-highlight)",
  subtitleSize = "14px",
  imageSrc,
  cardType = "Playlist",
  cardOwner = [],
  imageBorder = "rounded",
  imageSize = 64,
  width = "64px",
  height = "100%",
  orientation = "vertical", 
  className = "",
  isPinned = false,
  children,
  ...extra
}: CardProps) {
  const layoutClasses = {
    vertical: `flex flex-col items-start gap-4 p-4 h-full`,
    horizontal: `flex flex-row items-center gap-4 p-2 w-full`,
  };
  const separator = (cardType==="Artist" || cardType==="") ? "" : `\u{00B7}`
  cardOwner = cardType === "Artist" ? [] : cardOwner;
  const aux = cardType === "Single" ? `Song ${separator} ${cardOwner}` : `${cardType} ${separator} ${cardOwner}`;

  const cardBorder = cardType === "Artist" ? "circle" : "rounded";
  const subtitleVar =
  orientation === "vertical" && Array.isArray(cardOwner) && cardOwner.length > 0
    ? cardOwner.join(" , ")
    : ` ${aux}`;
  const dynamicStyles =
    orientation === "vertical" ? { maxWidth: `${imageSize}px` } : {};
  const pinnedVisibility = isPinned === false ? "hidden" : "";
  return (
    <div className={layoutClasses[orientation] + `bg-[${bgColor}] hover:bg-[${hoverBgColor}] overflow-x-hidden`} style={dynamicStyles}>
      <div className="shrink-0">
        <Image
          src={imageSrc}
          alt={`Capa de ${title}`}
          size={orientation === "horizontal" ? 56 : imageSize}
          shape={cardBorder}
        />
      </div>
      <div className="flex flex-col">
        <div className="w-full line-clamp-1">
          <Text
            textString={title}
            size={titleSize}
            weight="bold"
            color="#eeeeee"
          />
        </div>
        <div className="flex items-center gap-1 w-full min-w-0">
          <Icon
            src={PinnedPlaceholder}
            className={"shrink-0 size-4 "+ `${pinnedVisibility}`}
            color="#1ed760"
          />
          <div className="truncate">
            <Text textString={subtitleVar} size={subtitleSize} color="#aaaaaa" />
          </div>
        </div>
      </div>
      <div>{children}</div>
    </div>
  );
}
