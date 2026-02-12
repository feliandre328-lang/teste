import React from "react";
import { useAuth } from "../contexts/AuthContext";

export const AuthGate: React.FC<{ fallback: React.ReactNode; children: React.ReactNode }> = ({
  fallback,
  children,
}) => {
  const { loading, isAuthenticated } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 text-gray-100 flex items-center justify-center">
        Carregando...
      </div>
    );
  }

  return <>{isAuthenticated ? children : fallback}</>;
};
