
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MoreHorizontal, PlusCircle, Car, Phone } from "lucide-react";

const customers = [
  {
    id: "CUST-001",
    name: "Liam Johnson",
    email: "liam@example.com",
    avatar: "https://picsum.photos/seed/101/100/100",
    joinDate: "2023-10-15",
    phone: "9876543210",
    vehicleType: "SUV",
    vehicleNumber: "NY 01 XY 5678",
  },
  {
    id: "CUST-002",
    name: "Olivia Smith",
    email: "olivia@example.com",
    avatar: "https://picsum.photos/seed/102/100/100",
    joinDate: "2023-11-01",
    phone: "8765432109",
    vehicleType: "Sedan",
    vehicleNumber: "CA 02 AB 1234",
  },
  {
    id: "CUST-003",
    name: "Noah Williams",
    email: "noah@example.com",
    avatar: "https://picsum.photos/seed/103/100/100",
    joinDate: "2024-01-20",
    phone: "7654321098",
    vehicleType: "Hatchback",
    vehicleNumber: "TX 03 CD 9012",
  },
  {
    id: "CUST-004",
    name: "Emma Brown",
    email: "emma@example.com",
    avatar: "https://picsum.photos/seed/104/100/100",
    joinDate: "2023-09-05",
    phone: "6543210987",
    vehicleType: "SUV",
    vehicleNumber: "FL 04 EF 3456",
  },
  {
    id: "CUST-005",
    name: "James Jones",
    email: "james@example.com",
    avatar: "https://picsum.photos/seed/105/100/100",
    joinDate: "2024-02-11",
    phone: "5432109876",
    vehicleType: "Truck",
    vehicleNumber: "OH 05 GH 7890",
  },
];

export default function AdminCustomersPage() {
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
                  <TableCell className="hidden md:table-cell">
                    <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground"/>
                        <span>{customer.phone}</span>
                    </div>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                     <div className="flex items-center gap-2">
                        <Car className="h-4 w-4 text-muted-foreground"/>
                        <div>
                            <div>{customer.vehicleType}</div>
                            <div className="text-xs text-muted-foreground">{customer.vehicleNumber}</div>
                        </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">{customer.joinDate}</TableCell>
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
