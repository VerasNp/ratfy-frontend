"use client";

import React, { useState } from "react";
import Container from "@/components/generics/Container";
import Text from "@/components/generics/Text";
import InputText from "@/components/generics/InputText";
import Button from "@/components/generics/Button";
import Link from "@/components/generics/Link";

export default function ForgotPasswordPage() {
	const [step, setStep] = useState(1);
	const [email, setEmail] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [errorMsg, setErrorMsg] = useState("");

	const handleSendResetLink = async () => {
		setErrorMsg("");
		
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			setErrorMsg("Formato de e-mail inválido.");
			return;
		}

		setIsLoading(true);

		try {
			const apiUrl = process.env.NEXT_PUBLIC_API_URL;
			const response = await fetch(`${apiUrl}/forgot-password`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email }),
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.message || data.error || "Erro ao solicitar redefinição de senha.");
			}

			setStep(2);
		} catch (error: any) {
			setErrorMsg(error.message);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Container className="min-h-screen bg-[var(--bg-main)] flex flex-col items-center justify-center p-4">
			<Container className="w-full max-w-sm flex flex-col items-center">

				{errorMsg && (
					<div className="w-full bg-error-main/10 border border-error-main text-error-main p-3 rounded-md mb-6 text-sm text-center">
						{errorMsg}
					</div>
				)}

				{step === 1 && (
					<>
						<div className="mb-6 text-center">
							<Text textString="Redefinir senha" size="2xl" weight="bold" />
						</div>
						<div className="mb-8 text-center">
							<Text
								textString="Insira o e-mail associado à sua conta e enviaremos um link de recuperação." 
								size="base" 
								color="--text-secondary" 
							/>
						</div>
						
						<div className="w-full flex flex-col gap-6">
							<InputText
								label="E-mail"
								type="email"
								variant="defaultOutline"
								fullWidth
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
							
							<Button 
								variant="brand" 
								size="lg" 
								className="w-full"
								onClick={handleSendResetLink}
								disabled={isLoading}
							>
								{isLoading ? "Enviando..." : "Enviar link"}
							</Button>
						</div>
					</>
				)}

				{step === 2 && (
					<>
						<div className="mb-6 text-center">
							<Text textString="Verifique seu e-mail" size="2xl" weight="bold" />
						</div>
						<div className="mb-8 text-center">
							<Text 
								textString={`Enviamos um link de recuperação para o e-mail ${email}. Clique nele para criar uma nova senha.`} 
								size="base" 
								color="--text-secondary" 
							/>
						</div>
					</>
				)}

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

			</Container>
		</Container>
	);
}
