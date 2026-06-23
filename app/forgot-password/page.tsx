"use client";

import React, { useState } from "react";
import Container from "@/components/generics/Container";
import Text from "@/components/generics/Text";
import InputText from "@/components/generics/InputText";
import Button from "@/components/generics/Button";
import Link from "@/components/generics/Link";
import Icon from "@/components/generics/Icon";

export default function EsqueciSenhaPage() {
	const [step, setStep] = useState(1);

	return (
		<Container className="min-h-screen bg-[var(--bg-main)] flex flex-col items-center justify-center p-4">
			<Container className="w-full max-w-sm flex flex-col items-center">

				{step === 1 && (
					<>
						<div className="mb-6 text-center">
							<Text textString="Redefinir senha" size="20px" weight="bold" />
						</div>
						<div className="mb-8 text-center">
							<Text
								textString="Insira o e-mail associado à sua conta e enviaremos um código de recuperação." 
								size="16px" 
								color="--text-secondary" 
							/>
						</div>
						
						<div className="w-full flex flex-col gap-6">
							<InputText
								label="E-mail"
								type="email"
								variant="defaultOutline"
								fullWidth
							/>
							
							<Button 
								variant="brand" 
								size="lg" 
								className="w-full"
								onClick={() => setStep(2)} // Simula o envio do e-mail enquanto não temos o backend pronto.
							>
								Enviar código
							</Button>
						</div>
					</>
				)}

				{step === 2 && (
					<>
						<div className="mb-6 text-center">
							<Text textString="Insira o código" size="20px" weight="bold" />
						</div>
						<div className="mb-8 text-center">
							<Text 
								textString="Insira o código de 6 dígitos que enviamos para o seu e-mail." 
								size="16px" 
								color="--text-secondary" 
							/>
						</div>
						
						<div className="w-full flex flex-col gap-6">
							<InputText
								label="Código de recuperação"
								type="text"
								maxLength={6}
								variant="defaultOutline"
								className="text-center tracking-[0.5em] text-lg font-bold"
								fullWidth
							/>
							
							<Button 
								variant="brand" 
								size="lg" 
								className="w-full"
								onClick={() => setStep(3)} // Simula a validação do código enquanto não temos o backend pronto.
							>
								Verificar código
							</Button>
						</div>
					</>
				)}

				{step === 3 && (
					<>
						<div className="mb-6 text-center">
							<Text textString="Criar nova senha" size="20px" weight="bold" />
						</div>
						
						<div className="w-full flex flex-col gap-5">
							<InputText
								label="Nova senha"
								type="password"
								variant="defaultOutline"
								fullWidth
							/>
							<InputText
								label="Confirmar nova senha"
								type="password"
								variant="defaultOutline"
								fullWidth
							/>
							
							<Button 
								variant="brand" 
								size="lg" 
								className="w-full mt-2"
								onClick={() => setStep(4)} // Simula a alteração da senha enquanto não temos o backend pronto.
							>
								Salvar nova senha
							</Button>
						</div>
					</>
				)}

				{step === 4 && (
					<>
						<div className="mb-6 text-center">
							<Text textString="Senha atualizada!" size="20px" weight="bold" />
						</div>
						<div className="mb-8 text-center">
							<Text 
								textString="Sua senha foi redefinida com sucesso. Você já pode fazer login com a nova senha." 
								size="16px" 
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

				{step < 4 && (
					<>
						<div className="w-full h-px bg-[var(--bg-secondary)] opacity-30 my-8"></div>
						<div className="flex flex-col items-center gap-4">
							<Link
								text="Voltar para o login"
								pathName="/login"
                                queryKey=""
								color="--text-primary"
								hoverColor="--bg-brand"
								size="base"
							/>
						</div>
					</>
				)}

			</Container>
		</Container>
	);
}