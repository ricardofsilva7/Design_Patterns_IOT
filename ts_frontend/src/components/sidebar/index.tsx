"use client"

import { useEffect, useState } from 'react'
import { Sheet, SheetTrigger, SheetContent } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ChartArea, ClipboardList, Eye, Home, LogOut, SunMoon, Users } from 'lucide-react'
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip'
import { usePathname } from "next/navigation";
import "@/styles/styles.css";


export function Sidebar() {
  const [dark, setDark] = useState(false)

  // Efeito para adicionar/remover a classe 'dark' no body
  useEffect(() => {
    if (dark) {
      document.body.classList.add('dark')
    } else {
      document.body.classList.remove('dark')
    }
  }, [dark])
  
  const pathname = usePathname();

    return (
        <div className={`flex w-full flex-col ${dark ? 'bg-black text-white' : 'bg-white text-black'}`}>

        <aside className='fixed inset-y-0 left-0 z-10 hidden w-14 border-r bg-background
        sm:flex flex-col'>
            <nav className='flex flex-col items-center gap-4 px-2 py-5'>
                <TooltipProvider>
                    <Link 
                    href="#"
                    className='flex h-10 w-10 shrink-0 items-center justify-center bg-primary
                    text-primary-foreground rounded-full'
                    >
                        <Eye className='h-6 w-6'/>
                        <span className='sr-only'>Icone Osiris 'Olho'</span>
                    </Link>

                    <Tooltip>
                        <TooltipTrigger asChild>
                        <Link 
                    href="/"
                    className={`sidebar ${ pathname === '/' ? 'active' : '' }`}
                    >
                        <Home className='h-5 w-5'/>
                        <span className='sr-only'>Icone Início</span>
                    </Link>
                        </TooltipTrigger>
                        <TooltipContent side='left'>Início</TooltipContent>
                    </Tooltip>

                    <Tooltip>
                        <TooltipTrigger asChild>
                        <Link 
                    href="/pages/charts"
                    className={`sidebar ${ pathname === '/pages/charts' ? 'active' : '' }`}
                    >
                        <ChartArea className='h-5 w-5'/>
                        <span className='sr-only'>Icone Dashboards</span>
                    </Link>
                        </TooltipTrigger>
                        <TooltipContent side='left'>Dashboards</TooltipContent>
                    </Tooltip>

                    <Tooltip>
                        <TooltipTrigger asChild>
                        <Link 
                    href="/pages/reports"
                    className={`sidebar ${ pathname === '/pages/reports' ? 'active' : '' }`}
                    >
                        <ClipboardList className='h-5 w-5'/>
                        <span className='sr-only'>Icone Relatórios</span>
                    </Link>
                        </TooltipTrigger>
                        <TooltipContent side='left'>Relatórios</TooltipContent>
                    </Tooltip>

                    <Tooltip>
                        <TooltipTrigger asChild>
                        <Link 
                    href="/pages/users"
                    className={`sidebar ${ pathname === '/pages/users' ? 'active' : '' }`}
                    >
                        <Users className='h-5 w-5'/>
                        <span className='sr-only'>Icone Usuários</span>
                    </Link>
                        </TooltipTrigger>
                        <TooltipContent side='left'>Usuários</TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </nav>

            <nav className='mt-auto flex flex-col items-center gap-4 px-2 py-5'>
                <TooltipProvider>
                <Tooltip>
                        <TooltipTrigger asChild>
                            <Link 
                            href="#"
                            className='flex h-10 w-10 shrink-0 items-center justify-center 
                            rounded-lg text-muted-foreground transition-colors hover:text-foreground'
                            onClick={() => { setDark(old => !old) }}
                            >
                                <SunMoon className="h-5 w-5"/>
                                <span className='sr-only'>Tema</span>
                            </Link>
                            </TooltipTrigger>
                        <TooltipContent side="right">Tema</TooltipContent>
                    </Tooltip>

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Link 
                            href="/pages/login"
                            className='flex h-10 w-10 shrink-0 items-center justify-center 
                            rounded-lg text-muted-foreground transition-colors hover:text-red-500'
                            >
                                <LogOut className="h-5 w-5"/>
                                <span className='sr-only'>Sair</span>
                            </Link>
                            </TooltipTrigger>
                        <TooltipContent side="right">Sair</TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </nav>
        </aside>

        <div className="sm:hidden flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
                <header className='sticky top-0 z-30 flex h-14 items-center px-4 border-b bg-background gap-4 
                sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6'>
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button size="icon" className='sm:hidden'>
                                <Eye className="w-6 h-6"/>
                                <span className='sr-only'>Abrir / Fechar Menu</span>
                            </Button>
                        </SheetTrigger>

                        <SheetContent side="left" className='sm:max-w-x'>
                            <nav className='grid gap-6 text-lg font-medium'>
                            <Link 
                                href="#"
                                className='flex items-center'
                                prefetch={false}
                            >
                                <div className='flex h-10 w-10 bg-primary rounded-full 
                                            text-lg items-center justify-center text-primary-foreground'>
                                    <Eye className='h-5 w-5 transition-all'/>
                                    <span className='sr-only'>Logo do Projeto</span>
                                </div>
                                <span className="ml-3 text-foreground">Tag System</span>
                            </Link>


                                <Link 
                                href='/'
                                className='flex items-center gap-4 px2.5 text-muted-foreground
                                hover:text-foreground'
                                prefetch={false}
                                >
                                    <Home className='h-5 w-5 transition-all'/>
                                    Início
                                </Link>

                                <Link 
                                href='/pages/charts'
                                className='flex items-center gap-4 px2.5 text-muted-foreground
                                hover:text-foreground'
                                prefetch={false}
                                >
                                    <ChartArea className='h-5 w-5 transition-all'/>
                                    Dashboards
                                </Link>

                                <Link 
                                href='/pages/reports'
                                className='flex items-center gap-4 px2.5 text-muted-foreground
                                hover:text-foreground'
                                prefetch={false}
                                >
                                    <ClipboardList className='h-5 w-5 transition-all'/>
                                    Relatórios
                                </Link>

                                <Link 
                                href='/pages/users'
                                className='flex items-center gap-4 px2.5 text-muted-foreground
                                hover:text-foreground'
                                prefetch={false}
                                >
                                    <Users className='h-5 w-5 transition-all'/>
                                    Usuários
                                </Link>

                                <Link 
                                href='#'
                                className='flex items-center gap-4 px2.5 text-muted-foreground hover:text-foreground'
                                prefetch={false}
                                onClick={() => { setDark(old => !old) }}
                                >
                                    <SunMoon className='h-5 w-5 transition-all'/>
                                    Tema
                                </Link>

                                <Link 
                                href='#'
                                className='flex items-center gap-4 px2.5 text-muted-foreground
                                hover:text-red-500'
                                prefetch={false}
                                >
                                    <LogOut className='h-5 w-5 transition-all'/>
                                    Sair
                                </Link>
                            </nav>
                        </SheetContent>
                    </Sheet>
                    <h1 className='text-foreground font-semibold'>Tag System</h1>
                </header>
        </div>
        
        </div>
    );
}