import "@/styles/globals.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { AppProps } from "next/app";
import { Fira_Code, Inter as FontSans, Jersey_10 } from "next/font/google";

import Navbar from "@/components/main/Navbar";
import { ExplosionProvider } from "@/contexts/ExplosionContext";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const jersey10 = Jersey_10({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-jersey10",
});

const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-firaCode",
});

const fonts = [fontSans, jersey10, firaCode];

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <ExplosionProvider>
        <main
          className={`font-sans ` + fonts.map((font) => font.variable).join(" ")}
        >
          <Navbar />
          <Component {...pageProps} />
          <Footer />
        </main>
      </ExplosionProvider>
    </QueryClientProvider>
  );
}
