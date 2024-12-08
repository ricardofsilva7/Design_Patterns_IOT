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

        <InfoCard
          titulo="Acessos diários"
          subtitulo="Número de acessos permitidos no dia atual."
          prop="acessos"
          icone={Clock}
        />

        <InfoCard
          titulo="Tentativas de acesso"
          subtitulo="Número total de tentativas de acesso ocorridas."
          prop="tentativas"
          icone={ScanEye}
        />

        <InfoCard
          titulo="Acessos rejeitados"
          subtitulo="Número total de tentativas de acessos rejeitados." 
          prop="tentativas"
          icone={TimerOff}
        />

        <InfoCard
          titulo="Último acesso"
          subtitulo="Horário do último acesso permitido"
          prop="de hoje"
          icone={Timer}
        />
      </section>

      <section className="flex-1 mt-4">
        <UserTable />
      </section>

      <footer className="flex-1 mt-4">
        <p>Todos os direitos reservados a 2024.</p>
      </footer>
    </div>
  );
}
