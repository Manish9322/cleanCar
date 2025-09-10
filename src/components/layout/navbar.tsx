
"use client";

import Link from "next/link";
import { Car, Menu, User, LogOut } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";


import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/book", label: "Book a Wash" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // A simple check if the cookie exists. This runs on the client-side
    if (typeof window !== 'undefined') {
        const token = document.cookie.split('; ').find(row => row.startsWith('auth_token='));
        setIsAuthenticated(!!token);
    }
  }, [pathname]);


  const handleLogout = async () => {
    const response = await fetch('/api/auth/logout', { method: 'POST' });
    if(response.ok) {
        toast({ title: 'Logged Out', description: 'You have been successfully logged out.' });
        setIsAuthenticated(false);
        router.push('/');
        router.refresh();
    } else {
        toast({ title: 'Logout Failed', description: 'Something went wrong.', variant: 'destructive' });
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Car className="h-6 w-6" />
            <span className="hidden font-bold sm:inline-block">AquaShine</span>
          </Link>
          <nav className="flex items-center gap-6 text-sm">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "transition-colors hover:text-foreground/80",
                  pathname === link.href ? "text-foreground" : "text-foreground/60"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="pr-0">
                <Link href="/" className="mr-6 flex items-center space-x-2">
                  <Car className="h-6 w-6" />
                  <span className="font-bold">AquaShine</span>
                </Link>
                <div className="flex flex-col space-y-3 pt-6">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={cn(
                        "transition-colors hover:text-foreground/80",
                        pathname === link.href ? "text-foreground" : "text-foreground/60"
                      )}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
           <div className="w-full flex-1 md:w-auto md:flex-none">
             <Link href="/" className="flex items-center space-x-2 md:hidden">
                  <Car className="h-6 w-6" />
                  <span className="font-bold">AquaShine</span>
                </Link>
           </div>
          <nav className="flex items-center gap-2">
            {isAuthenticated ? (
                <>
                    <Button asChild variant="secondary">
                        <Link href="/user/profile">
                            <User className="mr-2 h-4 w-4"/>
                            My Account
                        </Link>
                    </Button>
                    <Button variant="outline" onClick={handleLogout}>
                         <LogOut className="mr-2 h-4 w-4" />
                        Logout
                    </Button>
                </>
            ) : (
                 <>
                    <Button asChild>
                        <Link href="/auth/login">Login</Link>
                    </Button>
                     <Button asChild variant="secondary">
                        <Link href="/auth/register">Register</Link>
                    </Button>
                </>
            )}
             <Button asChild>
              <Link href="/admin/login">Admin Login</Link>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}
