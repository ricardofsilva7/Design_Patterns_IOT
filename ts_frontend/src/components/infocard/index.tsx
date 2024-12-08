import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import React, { useState, useEffect, useCallback } from "react";
import axios from 'axios';


interface CardInformations {
  titulo: string;
  subtitulo?: string;
  icone: React.FC<React.SVGProps<SVGSVGElement>>;
  prop?: string;
}

interface AccessInfo {
  dailyaccess?: number;
  total?: number;
  rejected?: number;
  latest?: string;
}

export default function InfoCard({ titulo, subtitulo, icone: Icone, prop }: CardInformations) {
  const [data, setData] = useState<AccessInfo | null>(null);
  const [error, setError] = useState<string | null>(null);

  const rejectedUrl = "http://localhost:5267/api/Access/rejected";
  const totalUrl = "http://localhost:5267/api/Access/total";
  const latestUrl = "http://localhost:5267/api/Access/latest";
  const dailyaccessUrl = "http://localhost:5267/api/Access/dailyaccess";

  const fetchData = useCallback(async () => {
    try {
      // Altera a URL com base no título do card
      var urlTarget = "";
      if (titulo === "Acessos diários") {
        urlTarget = dailyaccessUrl;
      } else if (titulo === "Tentativas de acesso") {
        urlTarget = totalUrl;
      } else if (titulo == "Acessos rejeitados") {
        urlTarget = rejectedUrl;
      } else if (titulo == "Último acesso") {
        urlTarget = latestUrl;
      } else {
        setError("Título não encontrado");
      }

      const response = await axios.get(urlTarget, {
        headers: { 'Accept': 'application/json' }
      });

      // Verifica e ajusta o estado de acordo com a resposta de cada endpoint

      // Lógica para retornos com array (Utilizar se necessário)
      // if (titulo === "Acessos diários" && response.data.length > 0) {
      //   setData({ capacity: response.data[0].capacity });

      if (titulo === "Acessos diários" && response.data) {
        setData({ dailyaccess: response.data.todayAccess });
      } else if (titulo === "Tentativas de acesso" && response.data) {
        setData({ total: response.data.totalAccess });
      } else if (titulo === "Acessos rejeitados" && response.data) {
        setData({ rejected: response.data.rejectAccess })
      } else if (titulo === "Último acesso" && response.data) {
        setData({ latest: response.data.hourAccess })
      } else {
        setData(null);
        setError("Nenhum dado encontrado.");
      }
    } catch (error: any) {
      setError(error.response?.data || "Erro ao carregar dados");
      setData(null);
    }
  }, [titulo]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-center">
          <CardTitle className="text-lg sm:text-xl select-none">
            {titulo}
          </CardTitle>
          {Icone && <Icone className="ml-auto w-5 h-5" />}
        </div>

        <p className="text-muted-foreground">
          {subtitulo}
        </p>
      </CardHeader>

      <CardContent>
        {data ? (
          <p className="text-base sm:text-lg font-bold">
            {titulo === "Acessos diários" && `${data.dailyaccess} ${prop}`}
            {titulo === "Tentativas de acesso" && `${data.total} ${prop}`}
            {titulo === "Acessos rejeitados" && `${data.rejected} ${prop}`}
            {titulo === "Último acesso" && `${data.latest} ${prop}`}
          </p>
        ) : (
          <p>Carregando...</p>
        )}
        {error && <p className="text-red-500">{error}</p>}
      </CardContent>
    </Card>
  );
}