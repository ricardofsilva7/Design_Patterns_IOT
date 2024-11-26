import { X, Search } from "lucide-react";
import { Card, CardHeader, CardTitle } from "../ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export default function UserTable() {
    return (
        <Card className="w-full">
            <CardHeader>
                <div className="flex-1 sm:flex items-center justify-between">
                    <CardTitle className="text-lg mb-2 sm:text-xl mr-2">
                        Registro de acessos
                    </CardTitle>
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
                        <TableHead>Horário de entrada</TableHead>
                        <TableHead>Tag ativa?</TableHead>
                        <TableHead>Horário de saída</TableHead>
                        <TableHead>Local</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {Array.from({ length: 5 }).map((_, i) => {
                        return (
                            <TableRow key={i}>
                                <TableCell>Pessoa {i + 1}</TableCell>
                                <TableCell>Aluno ou Professor</TableCell>
                                <TableCell>0{5 + i}:{1 + i}0 0{i + 1}/10/2024</TableCell>
                                <TableCell><X color="#FF0000" /></TableCell>
                                <TableCell>0{6 + i}:{1 + i}0 0{i + 1}/10/2024</TableCell>
                                <TableCell>Sala (A{1 + i})</TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </Card>
    );
}