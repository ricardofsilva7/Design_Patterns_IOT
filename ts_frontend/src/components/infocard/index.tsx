import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import React, {ReactNode} from "react"

interface CardInformations {
  titulo: string;
  subtitulo?: string;
  value: number;
  icone: React.FC<React.SVGProps<SVGSVGElement>>;
  prop?: string;
}

export default function InfoCard({titulo, subtitulo, value, icone:Icone, prop}:CardInformations) {
    return (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-center">
              <CardTitle className="text-lg sm:text-xl select-none">
                {titulo}
              </CardTitle>
              {Icone && <Icone className="ml-auto w-5 h-5" />}
              </div>

            <CardDescription>
              {subtitulo}
            </CardDescription>
          </CardHeader>

          <CardContent>
            <p className="text-base sm:text-lg font-bold">{value} {prop}</p>
          </CardContent>
        </Card>
    );
}