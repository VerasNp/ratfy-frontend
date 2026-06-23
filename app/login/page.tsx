import React from "react";
import Container from "@/components/generics/Container";
import Text from "@/components/generics/Text";
import InputText from "@/components/generics/InputText";
import Button from "@/components/generics/Button";
import Link from "@/components/generics/Link";
import Icon from "@/components/generics/Icon";
import { Music } from "lucide-react";

export default function LoginPage() {
	return (
		<Container className="min-h-screen bg-[var(--bg-main)] flex flex-col items-center justify-center p-4">
			<Container className="w-full max-w-sm flex flex-col items-center">

				<div className="mb-8">
					<Icon src={Music} size={48} color="white" />
				</div>

				<div className="mb-10 text-center">
					<Text
						textString="Olá de novo"
						size="48px"
						weight="bold"
					/>
				</div>

				<div className="w-full flex flex-col gap-5">
					<InputText
						label="E-mail"
						type="email"
						variant="defaultOutline"
						fullWidth
					/>
					
					<InputText
						label="Senha"
						type="password"
						variant="defaultOutline"
						fullWidth
					/>

					<div className="mt-1 mb-2">
						<Link
							text="Esqueci minha senha"
							pathName="forgot-password"
                            queryKey=""
							color="--text-primary"
							hoverColor="--bg-brand"
							size="sm"
						/>
					</div>

					<Button variant="brand" size="lg" className="w-full mt-2">
						Continuar
					</Button>
				</div>

				<div className="w-full h-px bg-[var(--bg-secondary)] opacity-30 my-8"></div>

				<div className="flex flex-col items-center gap-4">
					<Text
						textString="Não tem uma conta?"
						color="--text-secondary"
						size="base"
						weight="medium"
					/>
					<Link
						text="Inscrever-se"
						pathName="/signup"
                        queryKey=""
						color="--text-primary"
						hoverColor="--bg-brand"
						size="base"
					/>
				</div>

			</Container>
		</Container>
	);
}