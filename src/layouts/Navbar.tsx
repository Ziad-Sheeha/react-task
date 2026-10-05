import { memo } from "react";
import { Button } from "primereact/button";

type NavbarProps = { onToggleSidebar: () => void };

function NavbarBase({ onToggleSidebar }: NavbarProps) {
  return (
    <header className="navbar">
      <Button icon="pi pi-bars" text rounded aria-label="Toggle sidebar" onClick={onToggleSidebar} />
      <span className="navbar__title">User Directory</span>
    </header>
  );
}

export const Navbar = memo(NavbarBase);
