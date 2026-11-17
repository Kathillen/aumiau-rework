
import { useState } from "react";
import { supabase } from "../../lib/supabase";

export default function Login() {
    const [isRegister, setIsRegister] = useState(false);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [loading, setLoading] = useState(false);

    async function handleSubmit() {
        if (!email || !password) {
            alert("Preencha todos os campos.");
            return;
        }

        if (isRegister && password !== confirmPassword) {
            alert("As senhas não coincidem.");
            return;
        }

        setLoading(true);

        try {
            if (isRegister) {
                const { data, error } = await supabase.auth.signUp({
                    email,
                    password,
                    options: {
                        emailRedirectTo: window.location.origin
                    }
                });

                if (error) throw error;

                if (data.session) {
                    alert("Conta criada com sucesso!");
                } else {
                    alert("Conta criada! Verifique seu e-mail para confirmar o cadastro.");
                }

            } else {
                const { error } = await supabase.auth.signInWithPassword({
                    email,
                    password
                });

                if (error) throw error;

                alert("Login realizado com sucesso!");
            }

        } catch (error) {
            if (error instanceof Error) {
                alert(error.message);
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="min-h-screen flex items-center justify-center bg-white">
            <div className="flex flex-col gap-4 w-80">

                <h1 className="text-2xl font-bold">
                    {isRegister ? "Criar conta" : "Login"}
                </h1>

                <input
                    type="email"
                    placeholder="E-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border p-3 rounded"
                />

                <input
                    type="password"
                    placeholder="Senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border p-3 rounded"
                />

                {isRegister && (
                    <input
                        type="password"
                        placeholder="Confirmar senha"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="border p-3 rounded"
                    />
                )}

                <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="bg-green-600 text-white p-3 rounded disabled:opacity-50"
                >
                    {loading
                        ? "Aguarde..."
                        : isRegister
                            ? "Criar conta"
                            : "Entrar"}
                </button>

                <p className="text-sm text-center">
                    {isRegister
                        ? "Já possui uma conta?"
                        : "Ainda não possui uma conta?"}

                    <button
                        type="button"
                        onClick={() => setIsRegister(!isRegister)}
                        className="text-green-600 font-semibold ml-1"
                    >
                        {isRegister ? "Entrar" : "Cadastre-se"}
                    </button>
                </p>

            </div>
        </main>
    );
}
