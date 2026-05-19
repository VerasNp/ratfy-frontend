import Icon from "@/components/generics/Icon";
import { Input } from "@/components/generics/Input";
import { LucideAlbum, LucideSearch } from "lucide-react";
import Image from "next/image";

export default function Home() {
	return (
		<>
			<div className="flex my-7">
				<div className="mx-5">
					<Input
						variant="default"
						size="lg"
						placeholder="Buscar na conta ou ajuda"
						fullWidth
						leftIcon={<Icon src={LucideSearch} />}
						rightIcon={{
							children: <Icon src={LucideAlbum} />,
							action: "link",
						}}
					/>
				</div>
				<div className="mx-5">
					<Input
						variant="defaultFilled"
						size="lg"
						placeholder="Buscar na conta ou ajuda"
						fullWidth
						leftIcon={<Icon src={LucideSearch} />}
						rightIcon={{
							children: <Icon src={LucideAlbum} />,
							action: "link",
						}}
					/>
				</div>
				<div className="mx-5">
					<Input
						variant="rounded"
						size="lg"
						placeholder="Buscar na conta ou ajuda"
						fullWidth
						leftIcon={<Icon src={LucideSearch} />}
						rightIcon={{
							children: <Icon src={LucideAlbum} />,
							action: "link",
						}}
					/>
				</div>
				<div className="mx-5">
					<Input
						variant="roundedFilled"
						size="lg"
						placeholder="Buscar na conta ou ajuda"
						fullWidth
						leftIcon={<Icon src={LucideSearch} />}
						rightIcon={{
							children: <Icon src={LucideAlbum} />,
							action: "link",
						}}
					/>
				</div>
			</div>
			<div className="flex my-7">
				<div className="mx-5">
					<Input
						variant="default"
						placeholder="Buscar na conta ou ajuda"
						fullWidth
						leftIcon={<Icon src={LucideSearch} />}
						rightIcon={{
							children: <Icon src={LucideAlbum} />,
							action: "link",
						}}
					/>
				</div>
				<div className="mx-5">
					<Input
						variant="defaultFilled"
						placeholder="Buscar na conta ou ajuda"
						fullWidth
						leftIcon={<Icon src={LucideSearch} />}
						rightIcon={{
							children: <Icon src={LucideAlbum} />,
							action: "link",
						}}
					/>
				</div>
				<div className="mx-5">
					<Input
						variant="rounded"
						placeholder="Buscar na conta ou ajuda"
						fullWidth
						leftIcon={<Icon src={LucideSearch} />}
						rightIcon={{
							children: <Icon src={LucideAlbum} />,
							action: "link",
						}}
					/>
				</div>
				<div className="mx-5">
					<Input
						variant="roundedFilled"
						placeholder="Buscar na conta ou ajuda"
						fullWidth
						leftIcon={<Icon src={LucideSearch} />}
						rightIcon={{
							children: <Icon src={LucideAlbum} />,
							action: "link",
						}}
					/>
				</div>
			</div>
			<div className="flex my-7">
				<div className="mx-5">
					<Input
						variant="default"
						size="sm"
						placeholder="Buscar na conta ou ajuda"
						fullWidth
						leftIcon={<Icon src={LucideSearch} />}
						rightIcon={{
							children: <Icon src={LucideAlbum} />,
							action: "link",
						}}
					/>
				</div>
				<div className="mx-5">
					<Input
						variant="defaultFilled"
						size="sm"
						placeholder="Buscar na conta ou ajuda"
						fullWidth
						leftIcon={<Icon src={LucideSearch} />}
						rightIcon={{
							children: <Icon src={LucideAlbum} />,
							action: "link",
						}}
					/>
				</div>
				<div className="mx-5">
					<Input
						variant="rounded"
						size="sm"
						placeholder="Buscar na conta ou ajuda"
						fullWidth
						leftIcon={<Icon src={LucideSearch} />}
						rightIcon={{
							children: <Icon src={LucideAlbum} />,
							action: "link",
						}}
					/>
				</div>
				<div className="mx-5">
					<Input
						variant="roundedFilled"
						size="sm"
						placeholder="Buscar na conta ou ajuda"
						fullWidth
						leftIcon={<Icon src={LucideSearch} />}
						rightIcon={{
							children: <Icon src={LucideAlbum} />,
							action: "link",
						}}
					/>
				</div>
			</div>
		</>
	);
}
