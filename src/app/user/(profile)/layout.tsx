"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { BookMarked, Car, Heart, LogOut, MessageSquare, User, Gauge } from "lucide-react";
import { cn } from "@/lib/utils";

const profileNavLinks = [
  { href: "/user/profile", label: "My Profile", icon: User },
  { href: "/user/bookings", label: "My Bookings", icon: BookMarked },
  { href: "/user/wash-status", label: "Wash Status", icon: Gauge },
  { href: "/user/feedback", label: "Give Feedback", icon: MessageSquare },
];

export default function UserProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="bg-muted/40">
        <section className="w-full bg-primary/90">
            <div className="container text-primary-foreground py-12 md:py-16">
                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline">
                    User Dashboard
                </h1>
                <p className="mt-2 text-lg md:text-xl text-primary-foreground/80">
                    Manage your profile, bookings, and more.
                </p>
            </div>
        </section>
        <div className="container max-w-7xl mx-auto py-12">
            <div className="grid md:grid-cols-4 gap-8 items-start">
                <div className="md:col-span-1">
                    <Card>
                        <CardHeader className="items-center text-center p-6">
                            <Avatar className="w-24 h-24 mb-4 border-4 border-primary/20">
                                <AvatarImage src="https://picsum.photos/seed/102/200/200" alt="Olivia Smith"/>
                                <AvatarFallback>OS</AvatarFallback>
                            </Avatar>
                            <h2 className="text-xl font-bold">Olivia Smith</h2>
                            <p className="text-sm text-muted-foreground">olivia@example.com</p>
                        </CardHeader>
                        <Separator />
                        <CardContent className="p-2">
                             <nav className="flex flex-col gap-1">
                                {profileNavLinks.map((link) => {
                                const Icon = link.icon;
                                return (
                                <Link key={link.href} href={link.href}>
                                    <Button
                                    variant={pathname === link.href ? "secondary" : "ghost"}
                                    className="w-full justify-start"
                                    >
                                    <Icon className="mr-2 h-4 w-4" />
                                    {link.label}
                                    </Button>
                                </Link>
                                );
                            })}
                             <Separator className="my-2"/>
                             <Button variant="ghost" className="w-full justify-start">
                                <LogOut className="mr-2 h-4 w-4" />
                                Logout
                            </Button>
                            </nav>
                        </CardContent>
                    </Card>
                </div>
                <div className="md:col-span-3">
                    {children}
                </div>
            </div>
        </div>
    </div>
  );
}
