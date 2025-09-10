import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MoreHorizontal, PlusCircle } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const services = [
  {
    id: "basic",
    name: "Basic Wash",
    description: "A quick and efficient exterior wash to make your car sparkle.",
    price: "₹999",
    duration: "30 mins",
    isActive: true,
  },
  {
    id: "deluxe",
    name: "Deluxe Detail",
    description: "Complete interior and exterior cleaning for a showroom look.",
    price: "₹1999",
    duration: "1.5 hours",
    isActive: true,
  },
  {
    id: "premium",
    name: "Premium Shine",
    description: "Our best package, including wax and polish for ultimate protection.",
    price: "₹2999",
    duration: "2.5 hours",
    isActive: true,
  },
    {
    id: "interior",
    name: "Interior Only",
    description: "A focused deep clean of the car's interior.",
    price: "₹1499",
    duration: "1 hour",
    isActive: false,
  },
];


export default function AdminServicesPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
       <h1 className="text-3xl font-bold tracking-tight">Services</h1>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" /> Add New Service
        </Button>
      </div>
        <Card>
          <CardHeader>
            <CardTitle>Manage Services</CardTitle>
            <CardDescription>View, edit, or add new services offered by AquaShine.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Service Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Status</TableHead>
                   <TableHead>
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {services.map((service) => (
                  <TableRow key={service.id}>
                    <TableCell className="font-medium">{service.name}</TableCell>
                    <TableCell className="text-sm text-muted-foreground max-w-xs truncate">{service.description}</TableCell>
                    <TableCell>{service.price}</TableCell>
                    <TableCell>{service.duration}</TableCell>
                    <TableCell>
                      <Badge variant={service.isActive ? "default" : "secondary"}>
                        {service.isActive ? "Active" : "Inactive"}
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
                          <DropdownMenuItem>Edit Service</DropdownMenuItem>
                          <DropdownMenuItem>{service.isActive ? 'Deactivate' : 'Activate'}</DropdownMenuItem>
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
