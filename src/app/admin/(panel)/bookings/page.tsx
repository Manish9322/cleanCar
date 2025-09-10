import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MoreHorizontal } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const bookings = [
  {
    id: "BK-8462",
    customer: "Liam Johnson",
    email: "liam@example.com",
    service: "Premium Shine",
    date: "2024-08-15",
    time: "10:00 AM",
    status: "Completed",
    amount: "₹2999"
  },
  {
    id: "BK-3921",
    customer: "Olivia Smith",
    email: "olivia@example.com",
    service: "Deluxe Detail",
    date: "2024-08-18",
    time: "02:00 PM",
    status: "Upcoming",
    amount: "₹1999"
  },
  {
    id: "BK-9274",
    customer: "Noah Williams",
    email: "noah@example.com",
    service: "Basic Wash",
    date: "2024-08-19",
    time: "09:00 AM",
    status: "Upcoming",
    amount: "₹999"
  },
  {
    id: "BK-1756",
    customer: "Emma Brown",
    email: "emma@example.com",
    service: "Deluxe Detail",
    date: "2024-08-14",
    time: "01:00 PM",
    status: "Completed",
    amount: "₹1999"
  },
  {
    id: "BK-5829",
    customer: "James Jones",
    email: "james@example.com",
    service: "Premium Shine",
    date: "2024-08-20",
    time: "11:00 AM",
    status: "Upcoming",
    amount: "₹2999"
  },
   {
    id: "BK-4815",
    customer: "Sophia Garcia",
    email: "sophia@example.com",
    service: "Basic Wash",
    date: "2024-08-21",
    time: "03:00 PM",
    status: "Upcoming",
    amount: "₹999"
  },
  {
    id: "BK-6238",
    customer: "William Miller",
    email: "william@example.com",
    service: "Premium Shine",
    date: "2024-08-16",
    time: "12:00 PM",
    status: "Completed",
    amount: "₹2999"
  },
];


const statusVariant = {
  Completed: "default",
  Upcoming: "secondary",
  Cancelled: "destructive"
} as const;


export default function AdminBookingsPage() {
  return (
    <div className="flex flex-col gap-6">
       <h1 className="text-3xl font-bold tracking-tight">Bookings</h1>
        <Card>
          <CardHeader>
            <CardTitle>All Bookings</CardTitle>
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
                {bookings.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell>
                        <div className="font-medium">{booking.customer}</div>
                        <div className="text-sm text-muted-foreground">{booking.email}</div>
                    </TableCell>
                    <TableCell>{booking.service}</TableCell>
                    <TableCell>
                        <div>{booking.date}</div>
                        <div className="text-sm text-muted-foreground">{booking.time}</div>
                    </TableCell>
                    <TableCell>{booking.amount}</TableCell>
                    <TableCell>
                      <Badge variant={statusVariant[booking.status as keyof typeof statusVariant]}>
                        {booking.status}
                      </Badge>
                    </TableCell>
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
                          <DropdownMenuItem>Mark as Completed</DropdownMenuItem>
                          <DropdownMenuItem>Cancel Booking</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
    </div>
  );
}
