"use client"

import React from "react";
import Relatorios from "@/components/relatorios";

export default function Reports() {
    return (
    <div className="sm:ml-14 p-4">
      <h1 className="my-2 font-semibold text-4xl border-b">Relatórios</h1>
      <h2 className="my-2">Últimos relatórios gerados</h2>

      <section className="mt-4 flex flex-col md:flex-row gap-4">
        <Relatorios/>
      </section>
    </div>
    );
}