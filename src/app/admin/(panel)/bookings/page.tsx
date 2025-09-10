"use client";

import { useGetBookingsQuery, useUpdateBookingMutation } from "@/lib/api";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MoreHorizontal, Loader2 } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

const statusVariant = {
  Completed: "default",
  Upcoming: "secondary",
  Cancelled: "destructive"
} as const;


function BookingSkeleton() {
    return (
        <TableRow>
            <TableCell>
                 <Skeleton className="h-4 w-24 mb-1" />
                 <Skeleton className="h-3 w-32" />
            </TableCell>
            <TableCell><Skeleton className="h-4 w-28" /></TableCell>
            <TableCell>
                <Skeleton className="h-4 w-24 mb-1" />
                <Skeleton className="h-3 w-16" />
            </TableCell>
            <TableCell><Skeleton className="h-4 w-16" /></TableCell>
            <TableCell><Skeleton className="h-6 w-24 rounded-full" /></TableCell>
            <TableCell><Skeleton className="h-8 w-8" /></TableCell>
        </TableRow>
    )
}

export default function AdminBookingsPage() {
    const { data: bookingsData, isLoading, isError, error } = useGetBookingsQuery(undefined);
    const [updateBooking, { isLoading: isUpdating }] = useUpdateBookingMutation();
    const { toast } = useToast();

    const handleUpdateStatus = async (id: string, status: "Completed" | "Cancelled") => {
        try {
            await updateBooking({ id, status }).unwrap();
            toast({ title: 'Success', description: `Booking marked as ${status}`});
        } catch (err) {
            toast({ title: 'Error', description: 'Failed to update booking status.', variant: 'destructive'});
        }
    }
  
    return (
        <div className="flex flex-col gap-6">
        <h1 className="text-3xl font-bold tracking-tight">Bookings</h1>
            <Card>
            <CardHeader>
                <CardTitle>All Bookings</CardTitle>
                <CardDescription>View and manage all customer bookings.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                <TableHeader>
                    <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Service</TableHead>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>
                        <span className="sr-only">Actions</span>
                    </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {isLoading ? (
                         Array.from({length: 5}).map((_, i) => <BookingSkeleton key={i} />)
                    ) : isError ? (
                        <TableRow>
                            <TableCell colSpan={6} className="text-center text-destructive">
                                Failed to load bookings: {(error as any)?.data?.message || 'Server error'}
                            </TableCell>
                        </TableRow>
                    ) : (
                    bookingsData?.data.map((booking: any) => (
                    <TableRow key={booking._id}>
                        <TableCell>
                            <div className="font-medium">{booking.customerDetails?.name || booking.userId?.name || 'N/A'}</div>
                            <div className="text-sm text-muted-foreground">{booking.customerDetails?.phone || booking.userId?.email || 'N/A'}</div>
                        </TableCell>
                        <TableCell>{booking.serviceId?.name || 'N/A'}</TableCell>
                        <TableCell>
                            <div>{new Date(booking.date).toLocaleDateString()}</div>
                            <div className="text-sm text-muted-foreground">{booking.time}</div>
                        </TableCell>
                        <TableCell>₹{booking.amount}</TableCell>
                        <TableCell>
                        <Badge variant={statusVariant[booking.status as keyof typeof statusVariant]}>
                            {booking.status}
                        </Badge>
                        </TableCell>
                        <TableCell>
                            {booking.status === 'Upcoming' && (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                <Button aria-haspopup="true" size="icon" variant="ghost" disabled={isUpdating}>
                                    {isUpdating ? <Loader2 className="h-4 w-4 animate-spin" /> : <MoreHorizontal className="h-4 w-4" />}
                                    <span className="sr-only">Toggle menu</span>
                                </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem onClick={() => handleUpdateStatus(booking._id, 'Completed')}>Mark as Completed</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleUpdateStatus(booking._id, 'Cancelled')}>Cancel Booking</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            )}
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
