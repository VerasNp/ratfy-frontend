import React,{ ReactNode }  from "react";
import Text from "../Text";
import Container from "../Container";
interface CardGroupProps {
    children?: React.ReactNode;
    title?: string;
    className?:string;
    orientation: string;
    hiddenTitle?: boolean;
}
import styles from "./Scrollbar.module.css"
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
        vertical: ` flex flex-col overflow-x-hidden overflow-y-scroll w-full gap-1 ${styles.scrollContainer}`,
        horizontal: ` flex flex-row overflow-x-scroll overflow-y-hidden min-h-[320px] px-1 gap-2 ${styles.scrollContainer}`
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
