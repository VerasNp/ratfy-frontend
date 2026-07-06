"use client";

import React, { useState, Suspense, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Container from "@/components/generics/Container";
import Text from "@/components/generics/Text";
import InputText from "@/components/generics/InputText";
import Button from "@/components/generics/Button";
import Link from "@/components/generics/Link";
import Icon from "@/components/generics/Icon";
import { Loader2 } from "lucide-react";

function ResetPasswordContent() {
	const searchParams = useSearchParams();
	const token = searchParams.get("token");
	const router = useRouter();

	const [step, setStep] = useState(1);
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [errorMsg, setErrorMsg] = useState("");

	useEffect(() => {
		if (!token) {
			router.push("/login");
		}
	}, [token, router]);

	if (!token) {
		return (
			<Container className="min-h-screen bg-[var(--bg-main)] flex items-center justify-center">
				<Icon src={Loader2} size={48} className="animate-spin text-[var(--text-secondary)]" color="currentColor" />
			</Container>
		);
	}

	const handleResetPassword = async () => {
		setErrorMsg("");

		if (!token) {
			setErrorMsg("Token de recuperação ausente ou inválido.");
			return;
		}

		if (newPassword !== confirmPassword) {
			setErrorMsg("As senhas não coincidem.");
			return;
		}

		const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;
		if (!passwordRegex.test(newPassword)) {
			setErrorMsg("A senha deve ter pelo menos 8 caracteres, uma letra minúscula, uma letra maiúscula, um número e um caractere especial.");
			return;
		}

		setIsLoading(true);

		try {
			const apiUrl = process.env.NEXT_PUBLIC_API_URL;
			const response = await fetch(`${apiUrl}/reset-password`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ 
					token: token, 
					newPassword: newPassword 
				}),
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.message || data.error || "O link de recuperação é inválido ou expirou.");
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
							<Text textString="Criar nova senha" size="2xl" weight="bold" />
						</div>
						
						<div className="w-full flex flex-col gap-5">
							<InputText
								label="Nova senha"
								type="password"
								variant="defaultOutline"
								fullWidth
								value={newPassword}
								onChange={(e) => setNewPassword(e.target.value)}
							/>
							<InputText
								label="Confirmar nova senha"
								type="password"
								variant="defaultOutline"
								fullWidth
								value={confirmPassword}
								onChange={(e) => setConfirmPassword(e.target.value)}
							/>
							
							<Button 
								variant="brand" 
								size="lg" 
								className="w-full mt-2"
								onClick={handleResetPassword}
								disabled={isLoading || !token}
							>
								{isLoading ? "Salvando..." : "Salvar nova senha"}
							</Button>
						</div>
					</>
				)}

				{step === 2 && (
					<>
						<div className="mb-6 text-center">
							<Text textString="Senha atualizada!" size="2xl" weight="bold" />
						</div>
						<div className="mb-8 text-center">
							<Text 
								textString="Sua senha foi redefinida com sucesso. Você já pode fazer login com a nova senha." 
								size="base" 
								color="--text-secondary" 
							/>
						</div>
						
						<div className="w-full">
							<a href="/login" className="w-full block">
								<Button variant="brand" size="lg" className="w-full">
									Ir para o login
								</Button>
							</a>
						</div>
					</>
				)}

				{step === 1 && (
					<>
						<div className="w-full h-px bg-[var(--bg-secondary)] opacity-30 my-8"></div>
						<div className="flex flex-col items-center gap-4">
							<Link
								text="Cancelar e voltar"
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

export default function ResetPasswordWrapper() {
	return (
		<Suspense fallback={
			<Container className="min-h-screen bg-[var(--bg-main)] flex items-center justify-center">
				<Icon src={Loader2} size={48} className="animate-spin text-[var(--text-secondary)]" color="currentColor" />
			</Container>
		}>
			<ResetPasswordContent />
		</Suspense>
	);
}
