
"use client";

import { useState } from 'react';
import { useGetServicesQuery, useAddServiceMutation, useUpdateServiceMutation, useDeleteServiceMutation } from '@/lib/api';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MoreHorizontal, PlusCircle, Loader2 } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';

type Service = {
  _id?: string;
  name: string;
  description: string;
  price: number;
  duration: string;
  isActive: boolean;
};

type ServiceModalProps = {
    service?: Service | null;
    children: React.ReactNode;
    onSave: (service: Partial<Service>) => void;
    isLoading: boolean;
}

function ServiceModal({ service, children, onSave, isLoading }: ServiceModalProps) {
  const [name, setName] = useState(service?.name || "");
  const [description, setDescription] = useState(service?.description || "");
  const [price, setPrice] = useState(service?.price || 0);
  const [duration, setDuration] = useState(service?.duration || "");
  const [isActive, setIsActive] = useState(service?.isActive ?? true);
  const [open, setOpen] = useState(false);

  React.useEffect(() => {
    if (open && service) {
        setName(service.name);
        setDescription(service.description);
        setPrice(service.price);
        setDuration(service.duration);
        setIsActive(service.isActive);
    } else if (open && !service) {
        setName("");
        setDescription("");
        setPrice(0);
        setDuration("");
        setIsActive(true);
    }
  }, [open, service]);


  const handleSubmit = () => {
    onSave({ _id: service?._id, name, description, price, duration, isActive });
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
            <Input id="price" type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} placeholder="e.g., 3999" className="col-span-3" />
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
           <Button type="submit" onClick={handleSubmit} disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save Changes
           </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

function ServiceSkeleton() {
    return (
        <TableRow>
            <TableCell><Skeleton className="h-4 w-32" /></TableCell>
            <TableCell className="hidden md:table-cell"><Skeleton className="h-4 w-64" /></TableCell>
            <TableCell><Skeleton className="h-4 w-16" /></TableCell>
            <TableCell className="hidden md:table-cell"><Skeleton className="h-4 w-24" /></TableCell>
            <TableCell><Skeleton className="h-6 w-16 rounded-full" /></TableCell>
            <TableCell><Skeleton className="h-8 w-8" /></TableCell>
        </TableRow>
    )
}

export default function AdminServicesPage() {
  const { data: services, isLoading, isError, error } = useGetServicesQuery(undefined);
  const [addService, { isLoading: isAdding }] = useAddServiceMutation();
  const [updateService, { isLoading: isUpdating }] = useUpdateServiceMutation();
  const [deleteService, { isLoading: isDeleting }] = useDeleteServiceMutation();
  const { toast } = useToast();

  const handleSave = async (serviceToSave: Partial<Service>) => {
    const { _id, ...serviceData } = serviceToSave;
    try {
        if(_id) { // It's an update
            await updateService({ id: _id, ...serviceData }).unwrap();
            toast({ title: 'Success', description: 'Service updated successfully.' });
        } else { // It's a new service
            await addService(serviceData).unwrap();
            toast({ title: 'Success', description: 'Service added successfully.' });
        }
    } catch(err) {
        toast({ title: 'Error', description: (err as any)?.data?.message || 'Failed to save service.', variant: 'destructive'});
    }
  };

  const handleDelete = async (serviceId: string) => {
    try {
        await deleteService(serviceId).unwrap();
        toast({ title: 'Success', description: 'Service deleted successfully.' });
    } catch(err) {
        toast({ title: 'Error', description: 'Failed to delete service.', variant: 'destructive'});
    }
  };
  
  const toggleActive = (service: Service) => {
      handleSave({ _id: service._id, isActive: !service.isActive });
  };

  const anyLoading = isAdding || isUpdating || isDeleting;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
       <h1 className="text-3xl font-bold tracking-tight">Services</h1>
        <ServiceModal onSave={handleSave} isLoading={isAdding} service={null}>
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
                {isLoading ? (
                    Array.from({length: 4}).map((_, i) => <ServiceSkeleton key={i} />)
                ) : isError ? (
                     <TableRow>
                        <TableCell colSpan={6} className="text-center text-destructive">
                            Failed to load services: {(error as any)?.data?.message || 'Server error'}
                        </TableCell>
                    </TableRow>
                ) : (services?.data.map((service: Service) => (
                  <TableRow key={service._id}>
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
                          <Button aria-haspopup="true" size="icon" variant="ghost" disabled={anyLoading}>
                             {isUpdating || isDeleting ? <Loader2 className="h-4 w-4 animate-spin"/> : <MoreHorizontal className="h-4 w-4" />}
                            <span className="sr-only">Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                           <ServiceModal service={service} onSave={handleSave} isLoading={isUpdating}>
                               <DropdownMenuItem onSelect={(e) => e.preventDefault()}>Edit Service</DropdownMenuItem>
                           </ServiceModal>
                          <DropdownMenuItem onClick={() => toggleActive(service)} disabled={isUpdating}>
                            {isUpdating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {service.isActive ? 'Deactivate' : 'Activate'}
                            </DropdownMenuItem>
                          <DropdownMenuSeparator />
                           <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <DropdownMenuItem className="text-destructive" onSelect={(e) => e.preventDefault()}>
                                        Delete Service
                                    </DropdownMenuItem>
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
                                    <AlertDialogAction onClick={() => handleDelete(service._id as string)} className="bg-destructive hover:bg-destructive/90" disabled={isDeleting}>
                                        {isDeleting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                        Delete
                                    </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
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
