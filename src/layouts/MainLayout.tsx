import type { ReactNode } from "react";

type MainLayoutProps = {
  children: ReactNode;
};

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="main-layout">
      <header>
        <h1>My App</h1>
      </header>
      <main>{children}</main>
    </div>
  );
}
