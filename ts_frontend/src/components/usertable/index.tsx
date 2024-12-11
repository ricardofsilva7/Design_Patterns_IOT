import { X, Search, FileText } from "lucide-react";
import { Card, CardHeader, CardTitle } from "../ui/card";
import React, { useState, useEffect, useCallback } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import axios from "axios";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import { pdf } from '@react-pdf/renderer';
import PDFDocument from './PDFDocument'; // Importando o componente PDFDocument

export interface TableInformationsProps {
    nome: string;
    cargo: string;
    horarioEntrada: string;
    tagAtiva: boolean;
    local: string;
  }
  
  export default function UserTable() {
    const [data, setData] = useState<TableInformationsProps[]>([]);
    const [filteredData, setFilteredData] = useState<TableInformationsProps[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [filters, setFilters] = useState({ nome: "", data: "", local: "" });
  
    const fetchData = useCallback(async () => {
      try {
        const response = await axios.get("http://localhost:5267/api/Access/accesshistory", {
          headers: { Accept: "application/json" },
        });
  
        if (Array.isArray(response.data)) {
          setData(response.data);
          setFilteredData(response.data);
        } else {
          setData([]);
          setFilteredData([]);
          setError("Os dados recebidos não estão no formato esperado.");
        }
      } catch (error: any) {
        setError(error.response?.data || "Erro ao carregar dados.");
        setData([]);
        setFilteredData([]);
      }
    }, []);
  
    useEffect(() => {
      fetchData();
    }, [fetchData]);
  
    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFilters((prev) => ({ ...prev, [name]: value }));
    };
  
    const handleFilterSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const { nome, data: dataFiltro, local } = filters;
  
      const dataFormatada = dataFiltro ? new Date(dataFiltro).toISOString().split('T')[0] : '';
  
      const filtered = data.filter((item) => {
        const matchesNome = nome ? item.nome.toLowerCase().includes(nome.toLowerCase()) : true;
        const matchesData = dataFormatada ? new Date(item.horarioEntrada).toISOString().startsWith(dataFormatada) : true;
        const matchesLocal = local ? item.local.toLowerCase().includes(local.toLowerCase()) : true;
  
        return matchesNome && matchesData && matchesLocal;
      });
  
      setFilteredData(filtered);
    };
  
    // Função para gerar o PDF
    const handleGeneratePDF = () => {
      pdf(<PDFDocument data={filteredData} />)
        .toBlob()
        .then((blob) => {
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = 'relatorio_de_acessos.pdf';
          link.click();
        });
    };
  
    return (
      <Card className="w-full">
        <CardHeader>
          <div className="flex-1 sm:flex items-center justify-between">
            <CardTitle className="text-lg mb-2 sm:text-xl mr-2">Registro de acessos</CardTitle>
            <form className="flex items-center gap-2" onSubmit={handleFilterSubmit}>
              <Input
                name="nome"
                placeholder="Nome"
                value={filters.nome}
                onChange={handleFilterChange}
              />
              <Input
                name="data"
                placeholder="Data"
                type="date"
                value={filters.data}
                onChange={handleFilterChange}
              />
              <Input
                name="local"
                placeholder="Local"
                value={filters.local}
                onChange={handleFilterChange}
              />
              <Button type="submit" variant="secondary">
                <Search className="w-4 h-4 mr-2" />
                Filtrar
              </Button>
              <Button type="button" variant="default" onClick={handleGeneratePDF}>
              <FileText className="w-4 h-4 mr-2" />
                Gerar PDF
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
            {filteredData.length > 0 ? (
              filteredData.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.nome}</TableCell>
                  <TableCell>{item.cargo}</TableCell>
                  <TableCell>
                    {new Date(item.horarioEntrada).toLocaleString('pt-BR', { 
                      hour12: false, 
                      hour: '2-digit', 
                      minute: '2-digit', 
                      second: '2-digit', 
                      year: 'numeric', 
                      month: '2-digit', 
                      day: '2-digit' 
                    })}
                  </TableCell>
                  <TableCell>
                    {item.tagAtiva ? (
                      <AiOutlineCheck color="#007C00" size={24} />
                    ) : (
                      <AiOutlineClose color="#FF0000" size={24} />
                    )}
                  </TableCell>
                  <TableCell>{item.local}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  {error || "Nenhum resultado encontrado."}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>
    );
  }