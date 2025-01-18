"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { 
  Menu, 
  Moon, 
  Sun, 
  User, 
  Shield 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";


const navigation = [
  { name: "Crypto Visualizer", href: "/dashboard/visualizer" },
  { name: "Vulnerability Scanner", href: "/dashboard/scanner" },
  { name: "Attack Lab", href: "/dashboard/lab" },
  { name: "Games", href: "/dashboard/games" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-12 items-center px-4 md:px-6">
          <Button
            variant="ghost"
            className="mr-2 md:hidden"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6" />
            <span className="font-semibold">CipherHaven</span>
          </div>
          <div className="ml-auto flex items-center gap-2">

            {/* User Profile */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9">
                  <User className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Link href="/login">Logout</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-3.5rem)]">
        <aside
          className={cn(
            "fixed inset-y-14 z-30 w-64 -translate-x-full border-r bg-background transition-transform lg:translate-x-0",
            sidebarOpen && "translate-x-0"
          )}
        >
          <nav className="space-y-1 p-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center px-4 py-2 text-sm font-medium rounded-md",
                  pathname === item.href
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted"
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main
          className={cn(
            "flex-1 overflow-y-auto lg:pl-64",
            sidebarOpen && "lg:pl-64"
          )}
        >
          {children}
        </main>
      </div>
    </div>
  );
}