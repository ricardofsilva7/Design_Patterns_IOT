"use client"

import React, { useState, useEffect, ReactNode } from 'react';
import { Bars } from '@/components/chart/Bars';
import { Radial } from '@/components/chart/Radial';
import { Sidebar } from "@/components/sidebar";
import { ThemeProvider } from '@/components/sidebar/ThemeContext';

interface Perfomance {
    id: number;
    step: string;
    cycletime: string;
    quantity: number;
    rating: number;
    energy: number;
}

export default function Charts({ children }: { children: ReactNode }) {
    const [performance, setPerfomance] = useState<Perfomance[]>([]);

    useEffect(() => {
        const data: Perfomance[] = [

        ];

        setPerfomance(data);
    }, []);

    return (
    <div>
        <ThemeProvider>
            <Sidebar/>
        </ThemeProvider>
        <div>
            <div className="sm:ml-14 p-4">
                    <h1 className="my-2 font-semibold text-4xl border-b">Dashboards</h1>
                    <h2 className="my-2">Resumo dos últimos acessos</h2>
                <section className="mt-4 flex flex-col md:flex-row gap-4">
                    <Bars/>
                    <Radial/>
                </section>
            </div>
        </div>
    </div>
    );
}