import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "../globals.css";
import { RootShell } from "@/components/RootShell";
import { buildMetadata, THEME_COLOR } from "@/lib/site";

/** Испанская версия владеет корнем сайта — это язык заведения. */
export const metadata: Metadata = buildMetadata("es");

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: THEME_COLOR,
};

export default function EsRootLayout({ children }: { children: ReactNode }) {
  return <RootShell locale="es">{children}</RootShell>;
}
