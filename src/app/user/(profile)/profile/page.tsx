"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const profileFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email(),
  phone: z.string().min(10, "Please enter a valid phone number."),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export function UserProfilePage() {
  const { toast } = useToast();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: "Olivia Smith",
      email: "olivia@example.com",
      phone: "9876543210",
    },
  });

  function onSubmit(data: ProfileFormValues) {
    console.log(data);
    toast({
      title: "Profile Updated!",
      description: "Your information has been saved successfully.",
    });
  }

  return (
    <div className="space-y-6">
        <Card>
        <CardHeader>
            <CardTitle>My Profile</CardTitle>
            <CardDescription>Manage your personal information.</CardDescription>
        </CardHeader>
        <CardContent>
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                            <Input placeholder="Your Name" {...field} />
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
                            <Input placeholder="your.email@example.com" {...field} readOnly />
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
                <Button type="submit">Save Changes</Button>
            </form>
            </Form>
        </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>Change Password</CardTitle>
                <CardDescription>Update your password for better security.</CardDescription>
            </CardHeader>
            <CardContent>
                 <form className="space-y-4">
                    <div className="space-y-2">
                        <FormLabel htmlFor="current-password">Current Password</FormLabel>
                        <Input id="current-password" type="password" />
                    </div>
                     <div className="space-y-2">
                        <FormLabel htmlFor="new-password">New Password</FormLabel>
                        <Input id="new-password" type="password" />
                    </div>
                     <div className="space-y-2">
                        <FormLabel htmlFor="confirm-password">Confirm New Password</FormLabel>
                        <Input id="confirm-password" type="password" />
                    </div>
                     <Button type="submit">Update Password</Button>
                </form>
            </CardContent>
        </Card>
    </div>
  );
}

export default UserProfilePage;
