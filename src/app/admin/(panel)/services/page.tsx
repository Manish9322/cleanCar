"use client";

import { useState } from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MoreHorizontal, PlusCircle } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';

type Service = {
  id: string;
  name: string;
  description: string;
  price: string;
  duration: string;
  isActive: boolean;
};

const initialServices: Service[] = [
  {
    id: "basic",
    name: "Basic Wash",
    description: "A quick and efficient exterior wash to make your car sparkle.",
    price: "999",
    duration: "30 mins",
    isActive: true,
  },
  {
    id: "deluxe",
    name: "Deluxe Detail",
    description: "Complete interior and exterior cleaning for a showroom look.",
    price: "1999",
    duration: "1.5 hours",
    isActive: true,
  },
  {
    id: "premium",
    name: "Premium Shine",
    description: "Our best package, including wax and polish for ultimate protection.",
    price: "2999",
    duration: "2.5 hours",
    isActive: true,
  },
    {
    id: "interior",
    name: "Interior Only",
    description: "A focused deep clean of the car's interior.",
    price: "1499",
    duration: "1 hour",
    isActive: false,
  },
];

function ServiceModal({ service, children, onSave }: { service?: Service, children: React.ReactNode, onSave: (service: Service) => void }) {
  const [name, setName] = useState(service?.name || "");
  const [description, setDescription] = useState(service?.description || "");
  const [price, setPrice] = useState(service?.price || "");
  const [duration, setDuration] = useState(service?.duration || "");
  const [isActive, setIsActive] = useState(service?.isActive ?? true);
  const [open, setOpen] = useState(false);

  const handleSubmit = () => {
    const newService: Service = {
      id: service?.id || `new-${Date.now()}`,
      name,
      description,
      price,
      duration,
      isActive
    };
    onSave(newService);
    setOpen(false);
  };
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{service ? 'Edit Service' : 'Add New Service'}</DialogTitle>
          <DialogDescription>
            {service ? 'Edit the details of the service.' : 'Fill in the details for the new service you want to offer.'}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">Name</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g., Ultimate Detail" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">Description</Label>
            <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Describe the service..." className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="price" className="text-right">Price (₹)</Label>
            <Input id="price" type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="e.g., 3999" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="duration" className="text-right">Duration</Label>
            <Input id="duration" value={duration} onChange={(e) => setDuration(e.target.value)} placeholder="e.g., 3 hours" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="isActive" className="text-right">Active</Label>
            <Switch id="isActive" checked={isActive} onCheckedChange={setIsActive} />
          </div>
        </div>
        <DialogFooter>
           <Button type="button" variant="secondary" onClick={() => setOpen(false)}>Cancel</Button>
           <Button type="submit" onClick={handleSubmit}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>(initialServices);

  const handleSave = (serviceToSave: Service) => {
    const exists = services.find(s => s.id === serviceToSave.id);
    if (exists) {
      setServices(services.map(s => s.id === serviceToSave.id ? serviceToSave : s));
    } else {
      setServices([...services, serviceToSave]);
    }
  };

  const handleDelete = (serviceId: string) => {
    setServices(services.filter(s => s.id !== serviceId));
  };
  
  const toggleActive = (service: Service) => {
      handleSave({ ...service, isActive: !service.isActive });
  };


  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
       <h1 className="text-3xl font-bold tracking-tight">Services</h1>
        <ServiceModal onSave={handleSave}>
            <Button>
                <PlusCircle className="mr-2 h-4 w-4" /> Add New Service
            </Button>
        </ServiceModal>
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
                  <TableHead className="hidden md:table-cell">Description</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead className="hidden md:table-cell">Duration</TableHead>
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
                    <TableCell className="text-sm text-muted-foreground hidden md:table-cell max-w-xs truncate">{service.description}</TableCell>
                    <TableCell>₹{service.price}</TableCell>
                    <TableCell className="hidden md:table-cell">{service.duration}</TableCell>
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
                           <ServiceModal service={service} onSave={handleSave}>
                               <DropdownMenuItem onSelect={(e) => e.preventDefault()}>Edit Service</DropdownMenuItem>
                           </ServiceModal>
                          <DropdownMenuItem onClick={() => toggleActive(service)}>{service.isActive ? 'Deactivate' : 'Activate'}</DropdownMenuItem>
                          <DropdownMenuSeparator />
                           <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <DropdownMenuItem className="text-destructive" onSelect={(e) => e.preventDefault()}>Delete Service</DropdownMenuItem>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This action cannot be undone. This will permanently delete the service.
                                    </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => handleDelete(service.id)} className="bg-destructive hover:bg-destructive/90">Delete</AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
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
