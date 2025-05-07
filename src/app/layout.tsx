import Sidebar from "./ui/sidebar/sidebar";
import Navbar from "./ui/navbar/navbar";
import "./globals.css";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>Insight Board</title>
      </head>
      <body className="font-sans bg-gray-100">
        <div className="flex h-screen">
          <Sidebar />
          <div className="flex flex-col flex-1 overflow-hidden">
            <Navbar />
            <main className="flex-1 p-6 overflow-auto">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
