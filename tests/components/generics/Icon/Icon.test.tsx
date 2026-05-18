import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { StaticImageData } from "next/image";
import "@testing-library/jest-dom";
import Icon from "@/components/generics/Icon";

const mockStaticImage: StaticImageData = {
	src: "/mock-icon.png",
	height: 24,
	width: 24,
	blurDataURL: "data:image/png;base64,mock",
};

const MockLucideIcon = (props: any) => (
	<svg data-testid="lucide-icon" {...props}>
		<circle cx="12" cy="12" r="10" />
	</svg>
);

describe("Icon Component", () => {
	it("should render static image correctly", () => {
		render(<Icon src={mockStaticImage} alt="test icon" />);
		const img = screen.getByAltText("test icon");
		expect(img).toBeInTheDocument();
	});

	it("should apply explicit width and height to static image", () => {
		render(<Icon src={mockStaticImage} alt="test" width={32} height={32} />);
		const img = screen.getByAltText("test") as HTMLImageElement;
		expect(img).toHaveAttribute("width", "32");
		expect(img).toHaveAttribute("height", "32");
	});

	it("should use 100% as default size when not specified", () => {
		render(<Icon src={mockStaticImage} alt="test" />);
		const img = screen.getByAltText("test") as HTMLImageElement;
		expect(img).toHaveAttribute("width", "100%");
		expect(img).toHaveAttribute("height", "100%");
	});

	it("should render Lucide component correctly", () => {
		render(<Icon src={MockLucideIcon} />);
		const lucideIcon = screen.getByTestId("lucide-icon");
		expect(lucideIcon).toBeInTheDocument();
	});

	it("should pass correct props to Lucide component", () => {
		render(
			<Icon
				src={MockLucideIcon}
				size={32}
				className="custom-class"
				color="red"
			/>,
		);
		const lucideIcon = screen.getByTestId("lucide-icon");
		expect(lucideIcon).toHaveAttribute("size", "32");
		expect(lucideIcon).toHaveClass("custom-class");
		expect(lucideIcon).toHaveAttribute("color", "red");
	});

	it("should use default values for Lucide when not specified", () => {
		render(<Icon src={MockLucideIcon} />);
		const lucideIcon = screen.getByTestId("lucide-icon");
		expect(lucideIcon).toHaveAttribute("size", "24");
		expect(lucideIcon).toHaveAttribute("color", "currentColor");
	});

	it("should apply CSS mask correctly to static image", () => {
        render(<Icon src={mockStaticImage} alt="test" />);
        const img = screen.getByAltText("test") as HTMLImageElement;
        expect(img.style.backgroundColor).toBe("currentcolor");
        expect(img.style.mask).toContain("url(/mock-icon.png)");
    });

	it("should use EMPTY_ICON as default src for static image", () => {
		render(<Icon src={mockStaticImage} alt="test" />);
		const img = screen.getByAltText("test") as HTMLImageElement;
		expect(img).toHaveAttribute(
			"src",
			expect.stringContaining("data:image/svg+xml"),
		);
	});
});
