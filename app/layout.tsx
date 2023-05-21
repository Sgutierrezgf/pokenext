import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";

import AuthContext from "./context/AuthContext";

import "./globals.css";
import ReactQueryContext from "./context/ReactQueryContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Pokemonoma",
  description: "An amazing app for searching pokemons",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReactQueryContext>
          <AuthContext>
            <Toaster />
            {children}
          </AuthContext>
        </ReactQueryContext>
      </body>
    </html>
  );
}
