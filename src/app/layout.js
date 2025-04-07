import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "./redux/providers";
import AuthContext from "./context/AuthContext";


export const metadata = {
  title: "Typing ...",
  description: "This is typing app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-b from-gray-900 to-gray-800">
        <AuthContext>
        <Providers>
          {children}
          </Providers>
        </AuthContext>
      </body>
    </html>
  );
}
