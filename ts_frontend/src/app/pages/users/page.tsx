"use client"

import React from "react";
import UserCard from "@/components/users";
import RegisterUserTable from "@/components/registertable";
import { Sidebar } from "@/components/sidebar";

export default function Users() {
    return (
        <div className="sm:ml-14 p-4">
            <Sidebar/>
            <header>
            <h1 className="my-2 font-semibold text-4xl">Usuários do sistema</h1>
            <h2 className="my-2">Administradores, editores e leitores do seu <strong>Tag System</strong>.</h2>
            <div className="my-2 grid grid-cols-2 gap-4 text-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                <UserCard
                    nome="Gustavo Monteiro"
                    email="teste@email.com"
                    cargo="Administrador"
                    senha="1234"
                />
            </div>
            </header>
            
            <main>
                <h1 className="my-2 font-semibold text-4xl">Usuários da sala</h1>
                <h2 className="my-2">Clientes e colaboradores do seu <strong>Tag System</strong>.</h2>
                <RegisterUserTable />
            </main>
        </div>
    );
}