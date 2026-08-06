import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Package,
  CalendarDays,
  Users,
  FileText,
  MessageSquare,
  ShoppingBag,
  Star,
  Menu,
  X,
  Home,
  LogOut,
  MountainSnow,
  Activity,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import logo from "@/assets/nomads-logo-official.png";

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  to: string;
  isExpanded: boolean;
  isActive: boolean;
}

const SidebarItem = ({ icon: Icon, label, to, isExpanded, isActive }: SidebarItemProps) => (
  <Link
    to={to}
    className={cn(
      "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-200 mt-1",
      isActive
        ? "bg-primary text-primary-foreground"
        : "text-muted-foreground hover:bg-secondary hover:text-secondary-foreground",
    )}
  >
    <Icon className="w-5 h-5 flex-shrink-0" />
    <AnimatePresence mode="wait">
      {isExpanded && (
        <motion.span
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width: "auto" }}
          exit={{ opacity: 0, width: 0 }}
          className="whitespace-nowrap overflow-hidden text-sm font-medium"
        >
          {label}
        </motion.span>
      )}
    </AnimatePresence>
  </Link>
);

export const AdminSidebar = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (typeof window === "undefined") return;
    document.body.style.overflow = isMobileOpen ? "hidden" : "";
    return () => {
      if (typeof window !== "undefined") {
        document.body.style.overflow = "";
      }
    };
  }, [isMobileOpen]);

  // Note: Adjust the import strategy or active checking based on Tanstack Router's matchRoute or useLocation
  const location = useLocation();

  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", to: "/admin" },
    { icon: Home, label: "Homepage CMS", to: "/admin/settings" },
    { icon: Activity, label: "SEO Health", to: "/admin/seo" },
    { icon: Package, label: "Packages", to: "/admin/packages" },
    { icon: ShoppingBag, label: "Shop", to: "/admin/shop" },
    { icon: CalendarDays, label: "Bookings", to: "/admin/bookings" },
    { icon: Users, label: "Users", to: "/admin/users" },
    { icon: MountainSnow, label: "Team", to: "/admin/teams" },
    { icon: FileText, label: "Blogs", to: "/admin/blogs" },
    { icon: MessageSquare, label: "Inquiries", to: "/admin/inquiries" },
    { icon: Star, label: "Reviews", to: "/admin/reviews" },
  ];

  return (
    <>
      {/* Mobile Menu Toggle */}
      <div className="md:hidden fixed top-0 left-0 w-full bg-background/95 backdrop-blur-md border-b z-40 px-4 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2">
          <img src={logo} alt="Nomads Navigate Nepal" className="w-8 h-8 object-contain" />
          <span className="font-bold text-lg">Nomade Admin</span>
        </div>
        <button
          onClick={() => setIsMobileOpen(true)}
          className="p-2 -mr-2 bg-secondary/50 rounded-md"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileOpen(false)}
            className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          width: isExpanded ? 260 : 70,
          x: isMobileOpen ? 0 : "auto",
        }}
        className={cn(
          "fixed top-0 z-50 flex h-screen flex-col bg-card border-r transition-all duration-300 shadow-xl md:relative md:z-20 md:h-auto md:shadow-none",
          "max-md:w-[280px] max-md:absolute max-md:left-0 max-md:h-screen max-md:overflow-hidden",
          !isMobileOpen && "max-md:-translate-x-full",
        )}
      >
        <div className="flex items-center justify-between p-4 flex-shrink-0 h-[60px]">
          <div className="flex items-center gap-2 overflow-hidden">
            <img
              src={logo}
              alt="Nomads Navigate Nepal"
              className="w-8 h-8 flex-shrink-0 object-contain"
            />
            <AnimatePresence mode="wait">
              {isExpanded && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="font-bold text-lg whitespace-nowrap"
                >
                  Nomade Admin
                </motion.span>
              )}
            </AnimatePresence>
          </div>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="hidden md:block p-1 hover:bg-secondary rounded-md"
          >
            <Menu className="w-5 h-5 text-muted-foreground" />
          </button>

          <button
            onClick={() => setIsMobileOpen(false)}
            className="md:hidden p-1.5 bg-secondary/80 hover:bg-secondary rounded-md"
          >
            <X className="w-5 h-5 text-foreground" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-4 px-2 space-y-1 md:max-h-[calc(100vh-120px)]">
          {navItems.map((item) => {
            const isActive =
              item.to === "/admin"
                ? location.pathname === "/admin"
                : location.pathname === item.to || location.pathname.startsWith(`${item.to}/`);

            return (
              <SidebarItem
                key={item.to}
                icon={item.icon}
                label={item.label}
                to={item.to}
                isExpanded={isExpanded}
                isActive={isActive}
              />
            );
          })}
        </div>

        <div className="p-2 border-t mt-auto">
          <button
            onClick={() => {
              if (typeof window !== "undefined") {
                window.localStorage.removeItem("token");
                window.localStorage.removeItem("authToken");
                window.localStorage.removeItem("user");
              }
              navigate({ to: "/login" });
            }}
            className="w-full flex items-center gap-3 px-3 py-2 mt-1 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors"
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            <AnimatePresence mode="wait">
              {isExpanded && (
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  className="whitespace-nowrap overflow-hidden text-sm font-medium text-left"
                >
                  Logout
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.aside>
    </>
  );
};
