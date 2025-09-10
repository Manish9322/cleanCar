import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MoreHorizontal, PlusCircle } from "lucide-react";

const customers = [
  {
    id: "CUST-001",
    name: "Liam Johnson",
    email: "liam@example.com",
    avatar: "https://picsum.photos/seed/101/100/100",
    joinDate: "2023-10-15",
    totalBookings: 5,
    totalSpent: "₹8995",
  },
  {
    id: "CUST-002",
    name: "Olivia Smith",
    email: "olivia@example.com",
    avatar: "https://picsum.photos/seed/102/100/100",
    joinDate: "2023-11-01",
    totalBookings: 3,
    totalSpent: "₹5997",
  },
  {
    id: "CUST-003",
    name: "Noah Williams",
    email: "noah@example.com",
    avatar: "https://picsum.photos/seed/103/100/100",
    joinDate: "2024-01-20",
    totalBookings: 2,
    totalSpent: "₹1998",
  },
  {
    id: "CUST-004",
    name: "Emma Brown",
    email: "emma@example.com",
    avatar: "https://picsum.photos/seed/104/100/100",
    joinDate: "2023-09-05",
    totalBookings: 8,
    totalSpent: "₹15992",
  },
  {
    id: "CUST-005",
    name: "James Jones",
    email: "james@example.com",
    avatar: "https://picsum.photos/seed/105/100/100",
    joinDate: "2024-02-11",
    totalBookings: 1,
    totalSpent: "₹2999",
  },
];

export default function AdminCustomersPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Customers</h1>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" /> Add New Customer
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Customer Management</CardTitle>
          <CardDescription>View and manage all your customers.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Join Date</TableHead>
                <TableHead className="text-center">Total Bookings</TableHead>
                <TableHead className="text-right">Total Spent</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={customer.avatar} alt={customer.name} />
                        <AvatarFallback>{customer.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{customer.name}</div>
                        <div className="text-sm text-muted-foreground">{customer.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{customer.joinDate}</TableCell>
                  <TableCell className="text-center">{customer.totalBookings}</TableCell>
                  <TableCell className="text-right">{customer.totalSpent}</TableCell>
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
                        <DropdownMenuItem className="text-destructive">Delete Customer</DropdownMenuItem>
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
