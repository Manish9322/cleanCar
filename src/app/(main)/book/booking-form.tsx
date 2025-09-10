"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CalendarIcon, Check } from "lucide-react";
import { format } from "date-fns";
import { useGetServicesQuery, useAddBookingMutation } from "@/lib/api";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";

const timeSlots = [
  "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
  "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM",
];

const bookingFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  phone: z.string().min(10, "Please enter a valid phone number."),
  serviceId: z.string({ required_error: "Please select a service." }),
  date: z.date({ required_error: "A date is required." }),
  time: z.string({ required_error: "Please select a time slot." }),
});

type BookingFormValues = z.infer<typeof bookingFormSchema>;

function ServiceSelectorSkeleton() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Array.from({length: 3}).map((_, i) => (
                <div key={i} className="p-4 border rounded-md">
                    <Skeleton className="h-5 w-2/3 mb-2"/>
                    <Skeleton className="h-4 w-1/3"/>
                </div>
            ))}
        </div>
    )
}


export function BookingForm() {
  const { data: servicesData, isLoading: isLoadingServices } = useGetServicesQuery(undefined);
  const [addBooking, { isLoading: isBooking }] = useAddBookingMutation();
  
  const { toast } = useToast();

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
  });

  async function onSubmit(data: BookingFormValues) {
    const selectedService = servicesData?.data.find((s: any) => s._id === data.serviceId);
    if (!selectedService) return;

    try {
        await addBooking({
            serviceId: data.serviceId,
            date: data.date.toISOString(),
            time: data.time,
            amount: selectedService.price,
            customerDetails: {
                name: data.name,
                phone: data.phone,
            }
        }).unwrap();

        toast({
            title: "Booking Confirmed!",
            description: `Your ${selectedService.name} is booked for ${format(data.date, "PPP")} at ${data.time}.`,
        });
        form.reset();
    } catch(err) {
         toast({
            title: "Booking Failed",
            description: (err as any)?.data?.message || "An unexpected error occurred.",
            variant: "destructive",
        });
    }
  }
  
  const activeServices = servicesData?.data.filter((service: any) => service.isActive);


  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle>Create Your Booking</CardTitle>
        <CardDescription>Fill in the details below to schedule your car wash.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="9876543210" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
            </div>
            <FormField
              control={form.control}
              name="serviceId"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>1. Choose your service</FormLabel>
                  <FormControl>
                    {isLoadingServices ? (
                        <ServiceSelectorSkeleton />
                    ) : (
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="grid grid-cols-1 md:grid-cols-3 gap-4"
                    >
                      {activeServices.map((service: any) => (
                        <FormItem key={service._id}>
                          <FormControl>
                            <RadioGroupItem value={service._id} className="sr-only" />
                          </FormControl>
                          <FormLabel className={cn(
                            "flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer transition-all",
                            field.value === service._id && "border-primary shadow-md"
                          )}>
                            <div className="flex justify-between w-full items-center">
                                <div>
                                    <p className="font-semibold">{service.name}</p>
                                    <p className="font-normal text-muted-foreground">₹{service.price}</p>
                                </div>
                                <div className={cn("h-6 w-6 flex items-center justify-center rounded-full border", field.value === service._id ? "bg-primary text-primary-foreground border-primary" : "border-muted-foreground ")}>
                                     {field.value === service._id && <Check className="h-4 w-4" />}
                                </div>
                            </div>
                          </FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                    )}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                    <FormItem className="flex flex-col">
                    <FormLabel>2. Select a date</FormLabel>
                    <Popover>
                        <PopoverTrigger asChild>
                        <FormControl>
                            <Button
                            variant={"outline"}
                            className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                            )}
                            >
                            {field.value ? (
                                format(field.value, "PPP")
                            ) : (
                                <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                        </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                            date < new Date(new Date().setHours(0,0,0,0)) 
                            }
                            initialFocus
                        />
                        </PopoverContent>
                    </Popover>
                    <FormMessage />
                    </FormItem>
                )}
                />

                <FormField
                control={form.control}
                name="time"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>3. Select a time</FormLabel>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        {timeSlots.map((time) => (
                        <Button
                            key={time}
                            variant={field.value === time ? "default" : "outline"}
                            type="button"
                            onClick={() => field.onChange(time)}
                            className="w-full"
                        >
                            {time}
                        </Button>
                        ))}
                    </div>
                    <FormMessage />
                    </FormItem>
                )}
                />
            </div>
            
            <Button type="submit" size="lg" className="w-full" disabled={isBooking}>
                {isBooking && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Book Now
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
