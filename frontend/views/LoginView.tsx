import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

export const LoginView: React.FC = () => {
  const { login } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login(username.trim(), password);
    } catch (err: any) {
      setError(err?.message ?? "Falha ao autenticar");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex items-center justify-center p-4">
      <form onSubmit={handleSubmit} className="w-full max-w-sm bg-gray-900 border border-gray-800 rounded-xl p-6">
        <h1 className="text-xl font-semibold mb-1">Acesso restrito</h1>
        <p className="text-sm text-gray-400 mb-6">Use seu usuário e senha</p>

        <label className="block text-sm mb-2">Usuário</label>
        <input className="w-full mb-4 px-3 py-2 rounded bg-gray-950 border border-gray-800 outline-none"
          value={username} onChange={(e) => setUsername(e.target.value)} autoComplete="username" />

        <label className="block text-sm mb-2">Senha</label>
        <input className="w-full mb-4 px-3 py-2 rounded bg-gray-950 border border-gray-800 outline-none"
          type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" />

        {error && <div className="text-sm text-red-400 mb-4">{error}</div>}

        <button disabled={loading} className="w-full bg-blue-500 hover:bg-blue-600 disabled:opacity-60 text-white rounded py-2 font-medium">
          {loading ? "Entrando..." : "Entrar"}
        </button>
      </form>
    </div>
  );
};
