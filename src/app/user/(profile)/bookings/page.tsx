import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Link from "next/link";

const userBookings = [
  {
    id: "BK-3921",
    service: "Deluxe Detail",
    date: "2024-08-18",
    time: "02:00 PM",
    status: "Upcoming",
    amount: "₹1999"
  },
  {
    id: "BK-1756",
    service: "Deluxe Detail",
    date: "2024-07-14",
    time: "01:00 PM",
    status: "Completed",
    amount: "₹1999"
  },
  {
    id: "BK-9274",
    service: "Basic Wash",
    date: "2024-06-19",
    time: "09:00 AM",
    status: "Completed",
    amount: "₹999"
  },
  {
    id: "BK-8462",
    customer: "Liam Johnson",
    service: "Premium Shine",
    date: "2024-05-15",
    time: "10:00 AM",
    status: "Completed",
    amount: "₹2999"
  },
];

const statusVariant = {
  Completed: "default",
  Upcoming: "secondary",
  Cancelled: "destructive"
} as const;

export default function UserBookingsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>My Bookings</CardTitle>
        <CardDescription>View your past and upcoming car wash appointments.</CardDescription>
      </CardHeader>
      <CardContent>
        {userBookings.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Booking ID</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Date & Time</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {userBookings.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell className="font-medium">{booking.id}</TableCell>
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
                    {booking.status === 'Upcoming' ? (
                      <Button variant="outline" size="sm">Cancel</Button>
                    ) : (
                      <Button variant="outline" size="sm">Rebook</Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">You have no bookings yet.</p>
            <Button asChild>
                <Link href="/book">Book a Wash</Link>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
