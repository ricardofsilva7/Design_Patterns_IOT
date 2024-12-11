"use client"

import React, { useState, useEffect } from 'react';
import { BarChartMultiple } from '@/components/chart/BarChartMultiple';
import { Radial } from '@/components/chart/Radial';
import { Sidebar } from "@/components/sidebar";
import { LineChartMultiple } from '@/components/chart/LineChartMultiple';

interface Perfomance {
    id: number;
    step: string;
    cycletime: string;
    quantity: number;
    rating: number;
    energy: number;
}

export default function Charts() {
    const [performance, setPerfomance] = useState<Perfomance[]>([]);

    useEffect(() => {
        const data: Perfomance[] = [

        ];

        setPerfomance(data);
    }, []);

    return (
        <div>
            <Sidebar />
            <div>
                <div className="sm:ml-14 p-4">
                    <h1 className="my-2 font-semibold text-4xl border-b">Dashboards</h1>
                    <h2 className="my-2">Resumo dos últimos acessos</h2>
                    <section className="mt-4 grid grid-cols-2 gap-4">
                        <BarChartMultiple />
                        {/* <Radial /> */}
                        <LineChartMultiple />
                    </section>
                </div>
            </div>
        </div>
    );
}