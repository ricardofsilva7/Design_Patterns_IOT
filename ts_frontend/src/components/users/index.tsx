import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import React from "react";
import { User } from "lucide-react";

// ? é opcional
interface UserInformations {
  nome: string;
  email: string;
  cargo: string; 
  senha: string;
}

export default function UserCard({ nome, email, cargo, senha }: UserInformations) {

  const [position, setPosition] = React.useState("bottom")

  return (
    <div>
      {/* Card Exemplo */}
      <Card className="shrink-0 transition-colors p-4 border rounded-lg shadow-md">
        <CardContent>
          <CardHeader className="flex flex-col items-center">
              <User className="my-6"/>
            <CardTitle>
              <h2 className="text-lg font-semibold">{nome}</h2>
            </CardTitle>
          </CardHeader>
          

          {/* User Information */}
          <div className="mb-6">
            <p className="text-base font-bold">Nível de acesso:</p>
            <p className="text-sm text-gray-500 mb-2">{cargo}</p>
            <p className="text-base font-bold">Contato:</p>
            <p className="text-sm text-gray-500 mb-2">{email}</p>
            <p className="text-base font-bold">Senha:</p>
            <p className="text-sm text-gray-500 mb-2">****</p>
          </div>

          {/* Buttons */}
          <CardFooter className="grid grid-cols-2 gap-2 ">

            {/* Editar usuários */}
            <Dialog>
              <DialogTrigger asChild>
                  <Button className="col-span-1">Editar</Button>
              </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Editar Usuário</DialogTitle>
                    <DialogDescription>Editar informações do usuário</DialogDescription>
                  </DialogHeader>

                        <form className="grid grid-cols-4 items-center text-left gap-2">
                          <Label htmlFor="desc">Nome</Label>
                          <Input placeholder="Digite seu nome" className="col-span-3"/>

                          <Label htmlFor="desc">Email</Label>
                          <Input placeholder="Digite seu email" className="col-span-3"/>

                          <Label htmlFor="desc">Senha</Label>
                          <Input placeholder="Digite seu sobrenome" className="col-span-3"/>

                          <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                              <Button variant="outline" className="col-span-4 items-center">Cargo</Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="w-56">
                              <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
                              <DropdownMenuRadioItem value="top">Administrador</DropdownMenuRadioItem>
                              <DropdownMenuRadioItem value="bottom">Editor</DropdownMenuRadioItem>
                              <DropdownMenuRadioItem value="right">Leitor</DropdownMenuRadioItem>
                              </DropdownMenuRadioGroup>
                          </DropdownMenuContent>
                          </DropdownMenu>
                        </form>
                        <DialogFooter className="flex flex-row justify-end gap-2 sm:gap-0">
                            <Button type="submit">Salvar</Button>
                        <DialogClose asChild>
                            <Button type="button" variant="destructive">Cancelar</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog> 

            {/* Deletar usuários */}
            <Dialog>
              <DialogTrigger asChild>
                  <Button variant="destructive" className="col-span-1">Deletar</Button>
              </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Deletar conta</DialogTitle>
                    <DialogDescription>Tem certeza que deseja deletar permanentemente o usuário?</DialogDescription>
                  </DialogHeader>
                        <DialogFooter className="flex flex-row justify-end gap-2 sm:gap-0">
                            <Button type="submit">Sim</Button>
                        <DialogClose asChild>
                            <Button type="button" variant="outline">Não</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog> 

          </CardFooter>
        </CardContent>
      </Card>
    </div>
  );
}