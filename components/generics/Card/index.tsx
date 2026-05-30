import Image from "../Image/index";
import Text from "../Text/index";

interface CardProps {
  imageSrc: string;
  subtitle: string;
  imageBorder?: "squared" | "rounded" | "circle";
  imageSize?: number;
  className?: string;
  type?: "vertical" | "horizontal";
  cardType?: "Album" | "Playlist" | "Artist" | "Single";
  cardOwner?: string[];
  width?: number | string;
  height?: number | string;
  title: string;
  titleSize?: number | string;
  subtitleSize?: number | string;
  children?: React.ReactNode;
  hoverBgColor?: string;
  hoverMask?: string;
  linkRedirect?: string;
}

export default function Card({
  title,
  titleSize = "18px",
  subtitle,
  subtitleSize = "12px",
  imageSrc,
  cardType = "Playlist",
  cardOwner = [],
  imageBorder = "rounded",
  imageSize = 192,
  width = "64px",
  height = "100%",
  type = "vertical",
  className = "",
  children,
  ...extra
}: CardProps) {
  const layoutClasses = {
    vertical: `flex flex-col items-start gap-4 p-4 h-full`,
    horizontal: "flex flex-row items-center gap-4 p-2 w-full",
  };
  const separator = cardType==="Artist" ? "" : `\u{00B7}`
  const aux = cardType === "Single" ? `Song ${separator} ${cardOwner}` : `${cardType} ${separator} ${cardOwner}`;

  const cardBorder = cardType === "Artist" ? "circle" : "rounded";
  const subtitleVar =
    type === "vertical" && cardOwner
      ? cardOwner.join(", ")
      : `${aux}`;
  const dynamicStyles =
    type === "vertical" ? { maxWidth: `${imageSize}px` } : {};
  return (
    <div className={layoutClasses[type] + ""} style={dynamicStyles}>
      <div>
        <Image
          src={imageSrc}
          alt={`Capa de ${title}`}
          size={type === "horizontal" ? 64 : imageSize}
          shape={cardBorder}
        />
      </div>
      <div className="flex flex-col ">
        <div className="w-full break-words">
          <Text
            textString={title}
            size={titleSize}
            weight="bold"
            color="#eeeeee"
          />
        </div>
        <div className="w-full break-words line-clamp-1">
          <Text textString={subtitleVar} size={subtitleSize} color="#aaaaaa" />
        </div>
      </div>
      <div>{children}</div>
    </div>
  );
}
