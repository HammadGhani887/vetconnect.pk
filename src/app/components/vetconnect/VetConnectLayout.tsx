import { Outlet } from "react-router";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { MobileBottomNav } from "./MobileBottomNav";
import { FloatingActionButton } from "./FloatingActionButton";

export function VetConnectLayout() {
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: "#FAFBFD", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    >
      <Navbar />
      {/* pb-20 on mobile to clear the sticky bottom nav */}
      <main className="flex-1 pb-0 lg:pb-0">
        <div className="pb-20 lg:pb-0">
          <Outlet />
        </div>
      </main>
      <div className="hidden lg:block">
        <Footer />
      </div>
      {/* Mobile-only footer visible above bottom nav */}
      <div className="lg:hidden pb-20">
        <Footer />
      </div>
      <MobileBottomNav />
      <FloatingActionButton />
    </div>
  );
}
