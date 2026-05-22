import Dropdown from "@/components/generics/Dropdown";
import Icon from "@/components/generics/Icon";
import Link from "@/components/generics/Link";
import { LucideActivitySquare } from "lucide-react";

export default function Home() {
	return (
		<>
			<Dropdown
				trigger="Menu"
				triggerIcon={<Icon src={LucideActivitySquare} />}
				itens={[
					{
						icon: <Icon src={LucideActivitySquare} />,
						item: <Link text="Home" pathName="/" queryKey="" />,
					},
					{
						item: <Link text="Home" pathName="/" queryKey="" />,
					},
				]}
			/>
			<Dropdown
				itens={[
					{
						icon: <Icon src={LucideActivitySquare} />,
						item: <Link text="Home" pathName="/" queryKey="" />,
					},
					{
						item: <Link text="Home" pathName="/" queryKey="" />,
					},
				]}
			/>
		</>
	);
}
