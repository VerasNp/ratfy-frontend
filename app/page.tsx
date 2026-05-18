import { Input } from "@/components/generics/Input";
import Image from "next/image";

export default function Home() {
	return (
		<>
			<Input
				variant="filled"
				placeholder="O que você quer ouvir?"
				fullWidth
			/>
			<Input
				label="E-mail"
				type="email"
				state="error"
				helperText="E-mail inválido"
				fullWidth
			/>
			<Input
				label="E-mail"
				type="email"
				state="success"
				helperText="E-mail disponível"
				fullWidth
			/>
			<Input
				label="Senha"
				type="password"
				fullWidth
			/>
			<Input
				variant="ghost"
				size="sm"
				placeholder="Buscar playlist..."
				fullWidth
			/>
			<Input
				label="Nome de usuário"
				variant="filled"
				helperText="Será exibido no seu perfil"
				fullWidth
			/>
		</>
	);
}
