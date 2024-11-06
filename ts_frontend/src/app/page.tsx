"use client"
import InfoCard from "@/components/infocard";
import UserTable from "@/components/usertable";
import { Package } from "lucide-react";
import React from "react";

export default function App() {
  return (
    <div className="sm:ml-14 p-4 gap-2">
      <h1 className="font-semibold text-4xl border-b">Tag System</h1>
      <h2 className="my-2">Bem vindo de volta Admin</h2>

      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <InfoCard titulo="Acesso diário" subtitulo="Acessos nas últimas 24h" value={14} prop="pessoas" icone={Package} />
        <InfoCard titulo="Em operação" subtitulo="Pessoas na sala no momento" value={3} prop="pessoas" icone={Package} />
        <InfoCard titulo="Total de Entradas" subtitulo="Todos os acessos da semana" value={92} prop="acessos" icone={Package} />
        <InfoCard titulo="Indisponibilidade" subtitulo="Tempo médio de parada" value={3} prop="horas" icone={Package} />
      </section>

      <section className="flex-1 mt-4">
        <UserTable/>
      </section>

      <footer className="flex-1 mt-4">
        <p>Todos os direitos reservados, 2024.</p>
        <p>4/10 Corp Group Inc Entertainament.</p>
      </footer>
    </div>
  );
}
