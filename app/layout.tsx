"use client";
import "./globals.css";
import { ThemeProvider } from "styled-components";
import { theme } from "@/utils/theme";
import React from "react";
import { Header } from "@/components/Header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={theme}>
          <Header></Header>
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
