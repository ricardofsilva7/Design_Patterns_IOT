import { Eye, Lock, User } from "lucide-react";
import React from "react";
import { useState } from "react";
import { Button } from "../../../components/ui/button";
import './bganimation.css';

export default function Login({ onLogin }: { onLogin: () => void }) {
    return (
        <div className="flex text-center items-center justify-center my-28">
            <div className="rounded animated-background p-10 w-full">
            <form action="">
                <div className="text flex flex-col items-center">
                    <Eye className="h-8 w-8 transition-all"/>
                    <h1 className="font-semibold text-4xl">TAG System</h1>
                    <h2>Cuidando de tudo por você!</h2>
                </div>
                <div className="text flex justify-center m-3 gap-3">
                    <input                         
                    className="rounded bg-transparent focus:outline-none placeholder-white border-b-2 border-white"
                    type="email" 
                    placeholder=" Email" />
                    <User />
                </div>
                <div className="text flex justify-center m-3 gap-3">
                    <input 
                    className="rounded bg-transparent focus:outline-none placeholder-white border-b-2 border-white"
                    type="senha" 
                    placeholder=" Senha" />
                    <Lock />
                </div>
                <Button className="m-3" onClick={onLogin}>Entrar</Button>
                <div id="signup-link">
                    <p className="text">
                        Não tem conta? <a href="#" className="hover:text-blue-500">Registrar</a>
                    </p>
                </div>
            </form>
            </div>
        </div>
    );
}