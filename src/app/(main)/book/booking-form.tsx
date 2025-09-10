"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CalendarIcon, Check } from "lucide-react";
import { format } from "date-fns";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";

const services = [
  { id: "basic", name: "Basic Wash", price: "₹999" },
  { id: "deluxe", name: "Deluxe Detail", price: "₹1999" },
  { id: "premium", name: "Premium Shine", price: "₹2999" },
];

const timeSlots = [
  "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
  "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM",
];

const bookingFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  phone: z.string().min(10, "Please enter a valid phone number."),
  service: z.string({ required_error: "Please select a service." }),
  date: z.date({ required_error: "A date is required." }),
  time: z.string({ required_error: "Please select a time slot." }),
});

type BookingFormValues = z.infer<typeof bookingFormSchema>;

export function BookingForm() {
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
  });

  function onSubmit(data: BookingFormValues) {
    console.log(data);
    toast({
      title: "Booking Confirmed!",
      description: `Your ${services.find(s=>s.id === data.service)?.name} is booked for ${format(data.date, "PPP")} at ${data.time}.`,
    });
    form.reset();
    setSelectedTime(null);
  }

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
              name="service"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>1. Choose your service</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="grid grid-cols-1 md:grid-cols-3 gap-4"
                    >
                      {services.map((service) => (
                        <FormItem key={service.id}>
                          <FormControl>
                            <RadioGroupItem value={service.id} className="sr-only" />
                          </FormControl>
                          <FormLabel className={cn(
                            "flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer transition-all",
                            field.value === service.id && "border-primary shadow-md"
                          )}>
                            <div className="flex justify-between w-full items-center">
                                <div>
                                    <p className="font-semibold">{service.name}</p>
                                    <p className="font-normal text-muted-foreground">{service.price}</p>
                                </div>
                                <div className={cn("h-6 w-6 flex items-center justify-center rounded-full border", field.value === service.id ? "bg-primary text-primary-foreground border-primary" : "border-muted-foreground ")}>
                                     {field.value === service.id && <Check className="h-4 w-4" />}
                                </div>
                            </div>
                          </FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
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
            
            <Button type="submit" size="lg" className="w-full">Book Now</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
