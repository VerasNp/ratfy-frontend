"use client";

import React, { useState } from "react";
import Container from "@/components/generics/Container";
import Text from "@/components/generics/Text";
import InputText from "@/components/generics/InputText";
import Button from "@/components/generics/Button";
import Link from "@/components/generics/Link";
import Icon from "@/components/generics/Icon";
import DateInput from "@/components/generics/DateInput";
import { Music } from "lucide-react";

export default function SignUpPage() {
	const [step, setStep] = useState(1);

	return (
		<Container className="min-h-screen bg-[var(--bg-main)] flex flex-col items-center justify-center p-4">
			<Container className="w-full max-w-sm flex flex-col items-center">

				<div className="mb-8">
					<Icon src={Music} size={48} color="white" />
				</div>

				{step === 1 && (
					<>
						<div className="mb-10 text-center">
							<Text
								textString="Se inscreva e comece a curtir"
								size="4xl"
								weight="bold"
							/>
						</div>

						<div className="w-full flex flex-col gap-5">
							<InputText
								label="Endereço de e-mail"
								type="email"
								placeholder="nome@dominio.com"
								variant="defaultOutline"
								fullWidth
							/>
							
							<InputText
								label="Senha"
								type="password"
								placeholder="Crie uma senha"
								variant="defaultOutline"
								fullWidth
							/>

							<Button 
								variant="brand" 
								size="lg" 
								className="w-full mt-4"
								onClick={() => setStep(2)}
							>
								Avançar
							</Button>
						</div>

						<div className="w-full h-px bg-[var(--bg-secondary)] opacity-30 my-8"></div>

						<div className="flex items-center gap-2">
							<Text
								textString="Já tem uma conta?"
								color="--text-secondary"
								size="base"
								weight="medium"
							/>
							<Link
								text="Entrar"
								pathName="/login"
                                queryKey=""
								color="--text-primary"
								hoverColor="--text-primary"
								size="base"
							/>
						</div>
					</>
				)}

				{step === 2 && (
					<>
						<div className="mb-10 text-center">
							<Text
								textString="Conte um pouco sobre você"
								size="4xl"
								weight="bold"
							/>
						</div>

						<div className="w-full flex flex-col gap-6">
							<InputText
								label="Como devemos chamar você?"
								type="text"
								placeholder="Ex: João Silva"
								variant="defaultOutline"
								fullWidth
							/>

							<div className="flex flex-col gap-1.5 w-full">
								<label className="text-xs font-semibold text-white">
									Qual é a sua data de nascimento?
								</label>
								<DateInput />
							</div>

							<div className="flex flex-col gap-3 mt-4">
								<Button 
									variant="brand" 
									size="lg" 
									className="w-full"
									onClick={() => setStep(3)}
								>
									Inscrever-se
								</Button>

								<Button 
									variant="ghost" 
									size="md" 
									className="w-full text-[var(--text-secondary)] hover:text-white"
									onClick={() => setStep(1)}
								>
									Voltar
								</Button>
							</div>
						</div>
					</>
				)}

				{step === 3 && (
					<>
						<div className="mb-6 text-center">
							<Text textString="Conta criada!" size="4xl" weight="bold" />
						</div>
						<div className="mb-8 text-center">
							<Text 
								textString="Sua conta foi criada com sucesso. Bem-vindo ao aplicativo!" 
								size="base" 
								color="--text-secondary" 
							/>
						</div>
						
						<div className="w-full">
							<a href="/login" className="w-full block">
								<Button 
									variant="brand" 
									size="lg" 
									className="w-full"
								>
									Ir para o login
								</Button>
							</a>
						</div>
					</>
				)}

			</Container>
		</Container>
	);
}