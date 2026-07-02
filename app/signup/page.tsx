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

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [name, setName] = useState("");
	const [day, setDay] = useState("");
	const [month, setMonth] = useState("");
	const [year, setYear] = useState("");

	const [isLoading, setIsLoading] = useState(false);
	const [errorMsg, setErrorMsg] = useState("");

	const handleNextStep = () => {
		setErrorMsg("");
		if (!email || !password) {
			setErrorMsg("Preencha o e-mail e a senha para continuar.");
			return;
		}

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			setErrorMsg("Formato de e-mail inválido.");
			return;
		}

		const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;
		if (!passwordRegex.test(password)) {
			setErrorMsg("A senha deve ter pelo menos 8 caracteres, uma letra minúscula, uma maiúscula, um número e um caractere especial.");
			return;
		}

		setStep(2);
	};

	const handleSignup = async () => {
		setErrorMsg("");
		if (!name || !day || !month || !year) {
			setErrorMsg("Preencha todos os campos corretamente.");
			return;
		}

		const formattedDay = day.padStart(2, '0');
		const birthDateStr = `${year}-${month}-${formattedDay}`;

		const birthDateObj = new Date(birthDateStr);
		const now = new Date();
		const cutoffDate = new Date(now.getFullYear() - 18, now.getMonth(), now.getDate());

		if (birthDateObj > now) {
			setErrorMsg("A data de nascimento não pode estar no futuro.");
			return;
		}

		if (birthDateObj > cutoffDate) {
			setErrorMsg("Você deve ter pelo menos 18 anos para se cadastrar.");
			return;
		}

		setIsLoading(true);

		const payload = {
			name: name,
			email: email,
			password: password,
			birthDate: birthDateStr,
		};

		try {
			const apiUrl = process.env.NEXT_PUBLIC_API_URL;
			const response = await fetch(`${apiUrl}/signup`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(payload),
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.message || data.error || "Ocorreu um erro ao criar a conta.");
			}

			setStep(3);
			
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

				{errorMsg && (
					<div className="w-full bg-red-500/10 border border-red-500 text-red-500 p-3 rounded-md mb-6 text-sm text-center">
						{errorMsg}
					</div>
				)}

				{step === 1 && (
					<>
						<div className="mb-10 text-center">
							<Text textString="Se inscreva e comece a curtir" size="4xl" weight="bold" />
						</div>

						<div className="w-full flex flex-col gap-5">
							<InputText
								label="Endereço de e-mail"
								type="email"
								placeholder="nome@dominio.com"
								variant="defaultOutline"
								fullWidth
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
							
							<InputText
								label="Senha"
								type="password"
								placeholder="Crie uma senha"
								variant="defaultOutline"
								fullWidth
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>

							<Button 
								variant="brand" 
								size="lg" 
								className="w-full mt-4"
								onClick={handleNextStep}
							>
								Avançar
							</Button>
						</div>

						<div className="w-full h-px bg-[var(--bg-secondary)] opacity-30 my-8"></div>

						<div className="flex items-center gap-2">
							<Text textString="Já tem uma conta?" color="--text-secondary" size="base" weight="medium" />
							<Link text="Entrar" pathName="/login" queryKey="" color="--text-primary" hoverColor="--text-primary" size="base" />
						</div>
					</>
				)}

				{step === 2 && (
					<>
						<div className="mb-10 text-center">
							<Text textString="Conte um pouco sobre você" size="4xl" weight="bold" />
						</div>

						<div className="w-full flex flex-col gap-6">
							<InputText
								label="Como devemos chamar você?"
								type="text"
								placeholder="Ex: João Silva"
								variant="defaultOutline"
								fullWidth
								value={name}
								onChange={(e) => setName(e.target.value)}
							/>

							<div className="flex flex-col gap-1.5 w-full">
								<label className="text-xs font-semibold text-white">
									Qual é a sua data de nascimento?
								</label>
								<DateInput 
									day={day} setDay={setDay}
									month={month} setMonth={setMonth}
									year={year} setYear={setYear}
								/>
							</div>

							<div className="flex flex-col gap-3 mt-4">
								<Button 
									variant="brand" 
									size="lg" 
									className="w-full"
									onClick={handleSignup}
									disabled={isLoading}
								>
									{isLoading ? "Enviando..." : "Inscrever-se"}
								</Button>

								<Button 
									variant="ghost" 
									size="md" 
									className="w-full text-[var(--text-secondary)] hover:text-white"
									onClick={() => {
										setErrorMsg("");
										setStep(1);
									}}
									disabled={isLoading}
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
							<Text textString="Sua conta foi criada com sucesso. Bem-vindo ao aplicativo!" size="base" color="--text-secondary" />
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

			</Container>
		</Container>
	);
}