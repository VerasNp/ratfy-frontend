"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Container from "@/components/generics/Container";
import Text from "@/components/generics/Text";
import Button from "@/components/generics/Button";
import Icon from "@/components/generics/Icon";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";

function VerifyEmailContent() {
	const searchParams = useSearchParams();
	const token = searchParams.get("token");

	const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
	const [errorMsg, setErrorMsg] = useState("");

	useEffect(() => {
		if (!token) {
			setStatus("error");
			setErrorMsg("Nenhum token de verificação foi encontrado na URL.");
			return;
		}

		const verifyToken = async () => {
			try {
				const apiUrl = process.env.NEXT_PUBLIC_API_URL;
				
				const response = await fetch(`${apiUrl}/verify-email?token=${token}`, {
					method: "GET",
				});

				const data = await response.json();

				if (!response.ok) {
					throw new Error(data.message || data.error || "O link de verificação é inválido ou já expirou.");
				}

				setStatus("success");
				
			} catch (error: any) {
				setStatus("error");
				setErrorMsg(error.message);
			}
		};

		verifyToken();
	}, [token]);

	return (
		<Container className="min-h-screen bg-[var(--bg-main)] flex flex-col items-center justify-center p-4">
			<Container className="w-full max-w-sm flex flex-col items-center text-center gap-6">

				{status === "loading" && (
					<>
						<div className="animate-spin text-[var(--text-secondary)]">
							<Icon src={Loader2} size={64} color="currentColor" />
						</div>
						<div>
							<Text textString="Verificando seu e-mail..." size="2xl" weight="bold" />
							<div className="mt-2">
								<Text 
									textString="Por favor, aguarde um momento." 
									size="base" 
									color="--text-secondary" 
								/>
							</div>
						</div>
					</>
				)}

				{status === "success" && (
					<>
						<Icon src={CheckCircle} size={64} color="var(--bg-brand)" />
						<div>
							<Text textString="E-mail verificado!" size="4xl" weight="bold" />
							<div className="mt-4 mb-2">
								<Text 
									textString="Sua conta foi ativada com sucesso. Você já pode acessar o aplicativo e começar a ouvir suas músicas." 
									size="base" 
									color="--text-secondary" 
								/>
							</div>
						</div>
						<div className="w-full mt-4">
							<a href="/login" className="w-full block">
								<Button variant="brand" size="lg" className="w-full">
									Fazer Login
								</Button>
							</a>
						</div>
					</>
				)}

				{status === "error" && (
					<>
						<Icon src={XCircle} size={64} color="var(--error-main)" />
						<div>
							<Text textString="Falha na verificação" size="4xl" weight="bold" />
							<div className="mt-4 mb-2">
								<Text 
									textString={errorMsg} 
									size="base" 
									color="--text-secondary" 
								/>
							</div>
						</div>
						<div className="w-full mt-4">
							<a href="/login" className="w-full block">
								<Button variant="brand" size="lg" className="w-full">
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

export default function VerifyEmailPage() {
	return (
		<Suspense fallback={
			<Container className="min-h-screen bg-[var(--bg-main)] flex items-center justify-center">
				<Icon src={Loader2} size={48} className="animate-spin text-[var(--text-secondary)]" color="currentColor" />
			</Container>
		}>
			<VerifyEmailContent />
		</Suspense>
	);
}