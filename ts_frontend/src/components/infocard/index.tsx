import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import React, { useState, useEffect, useCallback } from "react";
import axios from 'axios';


interface CardInformations {
  titulo: string;
  subtitulo?: string;
  value: number;
  icone: React.FC<React.SVGProps<SVGSVGElement>>;
  prop?: string;
}

interface AccessInfo{
  id?: number;
  rfid?: number;
  room?: string;
  isAuthorized?: boolean;
  TimeAccess?: String;
}

export default function InfoCard({titulo, subtitulo, value, icone:Icone, prop}:CardInformations) {
  const [data,setData] = useState<AccessInfo | null>(null);
  const [error,setError] = useState<string | null>(null);
  
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
            <p className="text-base sm:text-lg font-bold">{value} {prop}</p>
          </CardContent>
        </Card>
    );
}