import { PlusCircle } from "lucide-react";
import { Card, CardHeader, CardTitle } from "../ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Label } from "../ui/label";
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { DialogClose } from "@radix-ui/react-dialog";
import React from "react";

export default function RegisterUserTable() {

    const [position, setPosition] = React.useState("bottom")

    return (
        <Card className="w-full shadow-md">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle className="text-lg m- sm:text-xl mr-2">
                        Registro de Tags
                    </CardTitle>

                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className="ml-2">
                                <PlusCircle className="w-4 h-4 mr-2" />
                                Novo usuário
                            </Button>
                        </DialogTrigger>

                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Novo usuário</DialogTitle>
                                <DialogDescription>Informe os dados necessários para registra-ló</DialogDescription>
                            </DialogHeader>

                            <form className="space-y-6">

                                <div className="grid grid-cols-4 items-center text-left gap-2">
                                    <Label htmlFor="nome">Nome</Label>
                                    <Input id="nome" name="nome" placeholder="Digite o nome do colaborador" className="col-span-3"/>

                                    <Label htmlFor="tag">RfidTag</Label>
                                    <Input id="tag" placeholder="Digite o número da tag" className="col-span-4 sm:col-span-3"/>

                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="outline" className="col-span-4 items-center">Cargo</Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent className="w-56">
                                            <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
                                                <DropdownMenuRadioItem value="top">Professor</DropdownMenuRadioItem>
                                                <DropdownMenuRadioItem value="bottom">Aluno</DropdownMenuRadioItem>
                                                <DropdownMenuRadioItem value="right">Serviços</DropdownMenuRadioItem>
                                            </DropdownMenuRadioGroup>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>


                                <DialogFooter className="flex flex-row justify-end gap-2 sm:gap-0">
                                    <Button type="submit">Salvar</Button>
                                    <DialogClose asChild>
                                        <Button type="button" variant="destructive">Cancelar</Button>
                                    </DialogClose>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>
            </CardHeader>

            <Table>
                <TableHeader>
                    <TableHead>Nome</TableHead>
                    <TableHead>RfidTag</TableHead>
                    <TableHead>Cargo</TableHead>
                    <TableHead>Data de registro</TableHead>
                </TableHeader>

                <TableBody>
                    {Array.from({ length: 5 }).map((_,i) =>{
                        return (
                            <TableRow key={i}>
                                <TableCell>Pessoa {i+1}</TableCell>
                                <TableCell>0{5+i}1{1+i}00{i+1}</TableCell>
                                <TableCell>Aluno no (Bloco {1+i})</TableCell>
                                <TableCell>20/11/2024</TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </Card>
    );
}