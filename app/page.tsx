import { Input } from "@/components/generics/Input";
import Image from "next/image";

export default function Home() {
	return (
		<div className="flex justify-center h-100 bg-">
			<div className="w-64 content-center">
				<Input
					variant="default"
					placeholder="Buscar na conta ou ajuda"
					fullWidth
					leftIcon
					rightIcon
				/>
			</div>
		</div>
	);
}
