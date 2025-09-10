"use client";

import Link from "next/link";
import {
  Car,
  Home,
  LogOut,
  Settings,
  BookCopy,
  Users,
  MessageSquare,
  Mail,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";


import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarProvider,
  SidebarInset,
  SidebarTrigger
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function AdminPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
        const response = await fetch('/api/auth/logout', { method: 'POST' });
        if(response.ok) {
            toast({ title: 'Logged Out', description: 'You have been successfully logged out.' });
            router.push('/admin/login');
            router.refresh();
        } else {
            throw new Error('Logout failed');
        }
    } catch (error) {
        toast({ title: 'Logout Failed', description: 'Something went wrong.', variant: 'destructive' });
    }
  }


  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2">
            <Car className="size-6 text-primary" />
            <h2 className="text-lg font-semibold tracking-tight">AquaShine</h2>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton href="/admin">
                <Home />
                Dashboard
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton href="/admin/bookings">
                <BookCopy />
                Bookings
              </SidebarMenuButton>
            </SidebarMenuItem>
             <SidebarMenuItem>
              <SidebarMenuButton href="/admin/customers">
                <Users />
                Customers
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton href="/admin/services">
                <Settings />
                Services
              </SidebarMenuButton>
            </SidebarMenuItem>
             <SidebarMenuItem>
              <SidebarMenuButton href="/admin/feedback">
                <MessageSquare />
                Feedback
              </SidebarMenuButton>
            </SidebarMenuItem>
             <SidebarMenuItem>
              <SidebarMenuButton href="/admin/contact">
                <Mail />
                Contact Messages
              </SidebarMenuButton>
            </SidebarMenuItem>
             <SidebarMenuItem>
              <SidebarMenuButton href="/admin/settings">
                <Settings />
                Settings
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton onClick={handleLogout}>
                <LogOut />
                Logout
              </SidebarMenuButton>
            </SidebarMenuItem>
             <SidebarMenuItem>
              <SidebarMenuButton href="/">
                <Home />
                Back to Site
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-14 items-center justify-between gap-4 border-b bg-background px-4 lg:h-[60px] lg:px-6">
          <SidebarTrigger />
          <div className="flex items-center gap-4">
              <p className="text-sm font-medium">Admin</p>
            <Avatar className="h-8 w-8">
              <AvatarImage src="https://picsum.photos/seed/100/100/100" alt="Admin" data-ai-hint="person face" />
              <AvatarFallback>A</AvatarFallback>
            </Avatar>
          </div>
        </header>
        <main className="flex-1 p-4 lg:p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
