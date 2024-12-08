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
        <InfoCard titulo="Acesso diário" subtitulo="Acessos nas últimas 12h" prop="pessoas" icone={Clock} />
        <InfoCard titulo="Total de pessoas" subtitulo="Número de pessoas que passaram por esta sala" prop="pessoas" icone={ScanEye} />
        <InfoCard titulo="Número de acessos rejeitados" subtitulo="Número de tentativas de acessos" prop="pessoas" icone={TimerOff} />
        <InfoCard titulo="Último acesso" subtitulo="Horário do acesso mais recente" prop="horas" icone={Timer} />
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
