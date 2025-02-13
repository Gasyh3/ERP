"use client";

import Login from "@/components/login";
import { RootState } from "@/lib/store";
import { useSelector } from "react-redux";

export default function Home() {
  const { isAuthentificated, loading, error } = useSelector((state: RootState) => state.auth);

  return (
    <div className="flex flex-col items-center justify-center max-h-screen w-[100vw] p-8 gap-16 sm:p-20">
      <header className="sr-only">
        <h1>Accueil</h1>
      </header>
      <main className="flex flex-col gap-8 items-center justify-center sm:items-start w-full max-w-md text-center">
        {error && <p className="text-red-500" role="alert">Une erreur est survenue : {error}</p>}
        {isAuthentificated ? (
          <section className="text-green-500 text-lg font-bold">Connexion réussie</section>
        ) : (
          <Login />
        )}
      </main>
  
    </div>
  );
}
