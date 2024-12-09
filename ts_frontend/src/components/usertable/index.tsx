import { X, Search } from "lucide-react";
import { Card, CardHeader, CardTitle } from "../ui/card";
import React, { useState, useEffect, useCallback } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import axios from "axios";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";

interface TableInformationsProps {
    nome: string;
    cargo: string;
    horarioEntrada: string;
    tagAtiva: boolean;
    local: string;
}

export default function UserTable() {
    const [data, setData] = useState<TableInformationsProps[]>([]);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(async () => {
        try {
            const response = await axios.get("http://localhost:5267/api/Access/accesshistory", {
                headers: { Accept: "application/json" },
            });

            if (response.data && response.data.length > 0) {
                setData(response.data);
            } else {
                setData([]);
                setError("Nenhum dado encontrado.");
            }
        } catch (error: any) {
            setError(error.response?.data || "Erro ao carregar dados.");
            setData([]);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <Card className="w-full">
            <CardHeader>
                <div className="flex-1 sm:flex items-center justify-between">
                    <CardTitle className="text-lg mb-2 sm:text-xl mr-2">Registro de acessos</CardTitle>
                    <form className="flex items-center gap-2">
                        <Input name="nome" placeholder="Nome" />
                        <Input name="data" placeholder="Data" type="datetime-local" />
                        <Input name="local" placeholder="Local" />
                        <Button type="submit" variant="secondary">
                            <Search className="w-4 h-4 mr-2" />
                            Filtrar
                        </Button>
                    </form>
                </div>
            </CardHeader>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Nome</TableHead>
                        <TableHead>Cargo</TableHead>
                        <TableHead>Data e Horário</TableHead>
                        <TableHead>Autorizado</TableHead>
                        <TableHead>Local</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {data.length > 0 ? (
                        data.map((item, index) => (
                            <TableRow key={index}>
                                <TableCell>{item.nome}</TableCell>
                                <TableCell>{item.cargo}</TableCell>
                                <TableCell>{new Date(item.horarioEntrada).toLocaleString('pt-BR', { hour12: false })}</TableCell>
                                <TableCell>
                                    {item.tagAtiva ? (
                                        <AiOutlineCheck color="#007C00" size={24}/>  // Check verde
                                    ) : (
                                        <AiOutlineClose color="#FF0000" size={24}/>  // X vermelho
                                    )}
                                </TableCell>
                                <TableCell>{item.local}</TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={5} className="text-center">
                                {error || "Carregando..."}
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </Card>
    );
}