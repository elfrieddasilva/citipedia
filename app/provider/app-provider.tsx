"use client"

import React, { useState } from "react";
import { ThemeProvider} from "next-themes"
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {RenderMounted} from "@/app/provider/render-mounted";
export function AppProviders({ children }: { children: React.ReactNode }) {
    const [queryClient] = useState(()=> new QueryClient()) ;
    return (
        <RenderMounted>
        <QueryClientProvider client={queryClient}>
            <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
            >
                {children}
            </ThemeProvider>
        </QueryClientProvider>
        </RenderMounted>
    )
}
