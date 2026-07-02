"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Container from "@/components/generics/Container";
import Text from "@/components/generics/Text";
import InputText from "@/components/generics/InputText";
import Button from "@/components/generics/Button";
import Link from "@/components/generics/Link";
import Icon from "@/components/generics/Icon";
import { Music } from "lucide-react";

export default function LoginPage() {
	const router = useRouter();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const [isLoading, setIsLoading] = useState(false);
	const [errorMsg, setErrorMsg] = useState("");

	const handleLogin = async (e?: React.FormEvent) => {
		if (e) e.preventDefault();
		setErrorMsg("");

		if (!email || !password) {
			setErrorMsg("Preencha o e-mail e a senha.");
			return;
		}

		setIsLoading(true);

		try {
			const apiUrl = process.env.NEXT_PUBLIC_API_URL;
			const response = await fetch(`${apiUrl}/login`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email, password }),
				credentials: "include", 
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.message || data.error || "Erro ao fazer login.");
			}

			if (data.accessToken) {
				localStorage.setItem("accessToken", data.accessToken);
			}

			router.push("/");
			
		} catch (error: any) {
			setErrorMsg(error.message);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Container className="min-h-screen bg-[var(--bg-main)] flex flex-col items-center justify-center p-4">
			<Container className="w-full max-w-sm flex flex-col items-center">

				<div className="mb-8">
					<Icon src={Music} size={48} color="white" />
				</div>

				<div className="mb-10 text-center">
					<Text
						textString="Olá de novo"
						size="4xl"
						weight="bold"
					/>
				</div>

				{errorMsg && (
					<div className="w-full bg-red-500/10 border border-red-500 text-red-500 p-3 rounded-md mb-6 text-sm text-center">
						{errorMsg}
					</div>
				)}

				<form onSubmit={handleLogin} className="w-full flex flex-col gap-5">
					<InputText
						label="E-mail"
						type="email"
						variant="defaultOutline"
						fullWidth
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					
					<InputText
						label="Senha"
						type="password"
						variant="defaultOutline"
						fullWidth
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>

					<div className="mt-1 mb-2">
						<Link
							text="Esqueci minha senha"
							pathName="/forgot-password"
							queryKey=""
							color="--text-primary"
							hoverColor="--bg-brand"
							size="sm"
						/>
					</div>

					<Button 
						type="submit" 
						variant="brand" 
						size="lg" 
						className="w-full mt-2"
						disabled={isLoading}
					>
						{isLoading ? "Entrando..." : "Continuar"}
					</Button>
				</form>

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