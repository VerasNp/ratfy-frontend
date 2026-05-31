import React,{ ReactNode }  from "react";
import Text from "../Text";
import Container from "../Container";
interface CardGroupProps {
    children?: React.ReactNode;
    title?: string;
    className?:string;
    orientation: "vertical" | "horizontal"; 
    hiddenTitle?: boolean;
}

export default function CardGroup (
    {
        children = {},
        title = "",
        className="",
        orientation = "horizontal",
        hiddenTitle = false,
        ...extra
    }
) {
    const layoutClasses = {
        vertical: ` flex flex-col overflow-x-hidden w-full gap-1`,
        horizontal: ` flex flex-row overflow-x-scroll scrollbar-hide px-1 gap-2 `
    }
    const flexOrientation = orientation === "vertical" ? "flex-col" : "flex-row"; 
    return (
        <Container
            className={`${className} w-full`}
        >
            <div className={`p-3.5 ${hiddenTitle === true ? "hidden" : ""}`}>
                <Text
                    textString={title}
                    size="32px"
                    weight="bold"
                />
            </div>
            <div className={layoutClasses[orientation] + ` ${flexOrientation}`}>
                {React.Children.map(children, (child, index) => (
                    <div key={"card_"+index} className="shrink-0 ">
                        {child}
                    </div>
                ))}
            </div>
        </Container>
    );
}