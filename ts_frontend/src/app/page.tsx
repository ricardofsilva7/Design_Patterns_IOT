"use client"
import InfoCard from "@/components/infocard";
import UserTable from "@/components/usertable";
import { Clock, ScanEye, Timer, TimerOff } from "lucide-react";
import React from "react";

export default function App() {
  return (
    <div className="sm:ml-14 p-4 gap-2">
      <h1 className="font-semibold text-4xl border-b">Tag System</h1>
      <h2 className="my-2">Bem vindo de volta Admin</h2>

      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <InfoCard titulo="Acesso diário" subtitulo="Acessos nas últimas 24h" value={14} prop="pessoas" icone={Clock} />
        <InfoCard titulo="Em operação" subtitulo="Pessoas presentes na sala neste momento" value={3} prop="pessoas" icone={ScanEye} />
        <InfoCard titulo="Indisponibilidade" subtitulo="Tempo de sala inoperante nesta semana" value={53} prop="minutos" icone={TimerOff} />
        <InfoCard titulo="Manutenção" subtitulo="Tempo médio de parada para manutenção na semana" value={3} prop="horas" icone={Timer} />
      </section>

      <section className="flex-1 mt-4">
        <UserTable/>
      </section>

      <footer className="flex-1 mt-4">
        <p>Todos os direitos reservados, 2024.</p>
        <p>Squad 4/10 .</p>
      </footer>
    </div>
  );
}
