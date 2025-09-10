"use client"

import { useGetContactsQuery, useDeleteContactMutation } from "@/lib/api";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MoreHorizontal, Trash2, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from 'date-fns';


function ContactSkeleton() {
    return (
        <TableRow>
            <TableCell>
                 <Skeleton className="h-4 w-24 mb-1" />
                 <Skeleton className="h-3 w-32" />
            </TableCell>
            <TableCell><Skeleton className="h-10 w-full" /></TableCell>
            <TableCell><Skeleton className="h-4 w-24" /></TableCell>
            <TableCell><Skeleton className="h-8 w-8" /></TableCell>
        </TableRow>
    )
}

export default function AdminContactPage() {
  const { data: contacts, isLoading, isError, error } = useGetContactsQuery(undefined);
  const [deleteContact, { isLoading: isDeleting }] = useDeleteContactMutation();
  const { toast } = useToast();

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure? This will permanently delete this message.")) return;
    try {
      await deleteContact(id).unwrap();
      toast({ title: 'Success', description: 'Message deleted successfully.' });
    } catch (err) {
      toast({ title: 'Error', description: 'Failed to delete message.', variant: 'destructive' });
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold tracking-tight">Contact Messages</h1>
      <Card>
        <CardHeader>
          <CardTitle>Inbox</CardTitle>
          <CardDescription>Review and manage messages sent from the contact form.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Sender</TableHead>
                <TableHead>Message</TableHead>
                <TableHead>Received</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                  Array.from({length: 5}).map((_, i) => <ContactSkeleton key={i} />)
              ) : isError ? (
                     <TableRow>
                        <TableCell colSpan={4} className="text-center text-destructive">
                             Failed to load messages: {(error as any)?.data?.message || 'Server error'}
                        </TableCell>
                    </TableRow>
              ) : (contacts?.data.map((message: any) => (
                <TableRow key={message._id}>
                  <TableCell>
                    <div className="font-medium">{message.name}</div>
                    <div className="text-sm text-muted-foreground">{message.email}</div>
                  </TableCell>
                  <TableCell className="max-w-md truncate text-muted-foreground">{message.message}</TableCell>
                  <TableCell>{format(new Date(message.createdAt), "PPP")}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button aria-haspopup="true" size="icon" variant="ghost" disabled={isDeleting}>
                          {isDeleting ? <Loader2 className="h-4 w-4 animate-spin"/> : <MoreHorizontal className="h-4 w-4" />}
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem className="text-destructive" onClick={() => handleDelete(message._id)} disabled={isDeleting}>
                            <Trash2 className="mr-2 h-4 w-4" />
                            {isDeleting ? 'Deleting...' : 'Delete'}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              )))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
