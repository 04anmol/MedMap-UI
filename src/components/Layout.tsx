import { ReactNode } from "react";
import Navigation from "./Navigation";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-subtle">
      <main className="pb-20">
        {children}
      </main>
      <Navigation />
    </div>
  );
};

export default Layout;