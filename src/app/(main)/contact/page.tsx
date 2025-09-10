"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Mail, Phone, MapPin } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  message: z.string().min(10, "Message must be at least 10 characters."),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function ContactPage() {
  const { toast } = useToast();
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { name: "", email: "", message: "" },
  });

  function onSubmit(data: ContactFormValues) {
    console.log(data);
    toast({
      title: "Message Sent!",
      description: "Thanks for reaching out. We'll get back to you soon.",
    });
    form.reset();
  }

  return (
    <>
      <section className="w-full bg-primary/90">
          <div className="container text-center text-primary-foreground py-16 md:py-24">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl font-headline">
              Contact Us
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-primary-foreground/80">
              Have a question or want to give feedback? We'd love to hear from you.
            </p>
          </div>
      </section>

      <div className="container py-12 md:py-24 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="bg-primary text-primary-foreground p-3 rounded-md">
                <MapPin className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">Our Location</h3>
                <p className="text-muted-foreground">123 Sparkle Ave, Clean City, 12345</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-primary text-primary-foreground p-3 rounded-md">
                <Phone className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">Call Us</h3>
                <p className="text-muted-foreground">(123) 456-7890</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-primary text-primary-foreground p-3 rounded-md">
                <Mail className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">Email Us</h3>
                <p className="text-muted-foreground">contact@aquashine.com</p>
              </div>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Send a Message</CardTitle>
              <CardDescription>Fill out the form and we'll be in touch.</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input placeholder="you@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Message</FormLabel>
                        <FormControl>
                          <Textarea placeholder="How can we help you?" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full">Send Message</Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
