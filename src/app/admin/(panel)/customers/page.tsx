
"use client";

import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MoreHorizontal, PlusCircle, Car, Phone, Loader2 } from "lucide-react";
import { useGetUsersQuery, useDeleteUserMutation } from "@/lib/api";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";

function CustomerSkeleton() {
    return (
        <TableRow>
            <TableCell>
                <div className="flex items-center gap-3">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div>
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-3 w-32 mt-1" />
                    </div>
                </div>
            </TableCell>
            <TableCell className="hidden md:table-cell">
                <Skeleton className="h-4 w-28" />
            </TableCell>
            <TableCell className="hidden lg:table-cell">
                <Skeleton className="h-4 w-36" />
            </TableCell>
            <TableCell className="hidden lg:table-cell">
                <Skeleton className="h-4 w-24" />
            </TableCell>
            <TableCell>
                <Skeleton className="h-8 w-8" />
            </TableCell>
        </TableRow>
    )
}

export default function AdminCustomersPage() {
  const { data: users, isLoading, isError, error } = useGetUsersQuery(undefined);
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();
  const { toast } = useToast();

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
        await deleteUser(id).unwrap();
        toast({ title: "Success", description: "User deleted successfully." });
    } catch (err) {
        toast({ title: "Error", description: "Failed to delete user.", variant: "destructive" });
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Customers</h1>
        <Button asChild>
          <Link href="/auth/register">
            <PlusCircle className="mr-2 h-4 w-4" /> Add New Customer
          </Link>
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Customer Management</CardTitle>
          <CardDescription>View and manage all your registered customers.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead className="hidden md:table-cell">Contact</TableHead>
                <TableHead className="hidden lg:table-cell">Vehicle</TableHead>
                <TableHead className="hidden lg:table-cell">Join Date</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array.from({ length: 5 }).map((_, i) => <CustomerSkeleton key={i} />)
              ) : isError ? (
                <TableRow>
                    <TableCell colSpan={5} className="text-center text-destructive">
                        Failed to load users: {(error as any)?.data?.message || 'Server error'}
                    </TableCell>
                </TableRow>
              ) : (
                users?.data.map((customer: any) => (
                <TableRow key={customer._id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={`https://picsum.photos/seed/${customer._id}/100/100`} alt={customer.name} />
                        <AvatarFallback>{customer.name?.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{customer.name}</div>
                        <div className="text-sm text-muted-foreground">{customer.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground"/>
                        <span>{customer.phone || 'N/A'}</span>
                    </div>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                     <div className="flex items-center gap-2">
                        <Car className="h-4 w-4 text-muted-foreground"/>
                        <div>
                            <div>{customer.vehicleType || 'N/A'}</div>
                            <div className="text-xs text-muted-foreground">{customer.vehicleNumber || 'N/A'}</div>
                        </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">{new Date(customer.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button aria-haspopup="true" size="icon" variant="ghost">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Edit Customer</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive" onClick={() => handleDelete(customer._id)} disabled={isDeleting}>
                            {isDeleting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                            Delete Customer
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
