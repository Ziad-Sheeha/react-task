import { useCallback, useState, type ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";
import "./layout.css";

type MainLayoutProps = { children: ReactNode };

export function MainLayout({ children }: MainLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(() => window.innerWidth >= 768);
  const toggleSidebar = useCallback(() => setSidebarOpen((o) => !o), []);

  return (
    <div className="layout">
      <Navbar onToggleSidebar={toggleSidebar} />
      <div className="layout__body">
        <Sidebar open={sidebarOpen} />
        <main className="layout__content">{children}</main>
      </div>
    </div>
  );
}
