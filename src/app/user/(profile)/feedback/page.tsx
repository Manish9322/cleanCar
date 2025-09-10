"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const feedbackFormSchema = z.object({
  bookingId: z.string({ required_error: "Please select a booking." }),
  rating: z.coerce.number().min(1, "Rating is required").max(5),
  comment: z.string().min(10, "Comment must be at least 10 characters.").max(500, "Comment is too long."),
})

type FeedbackFormValues = z.infer<typeof feedbackFormSchema>

const pastBookings = [
    { id: "BK-1756", service: "Deluxe Detail", date: "2024-07-14" },
    { id: "BK-9274", service: "Basic Wash", date: "2024-06-19" },
    { id: "BK-8462", service: "Premium Shine", date: "2024-05-15" },
]

export default function UserFeedbackPage() {
  const { toast } = useToast()

  const form = useForm<FeedbackFormValues>({
    resolver: zodResolver(feedbackFormSchema),
  })

  function onSubmit(data: FeedbackFormValues) {
    console.log(data)
    toast({
      title: "Feedback Submitted!",
      description: "Thank you for sharing your experience with us.",
    })
    form.reset()
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Submit Feedback</CardTitle>
        <CardDescription>Share your experience about a recent service.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="bookingId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select Booking</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose a past service" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {pastBookings.map(booking => (
                        <SelectItem key={booking.id} value={booking.id}>
                          {booking.service} on {booking.date}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Rating</FormLabel>
                   <Select onValueChange={(value) => field.onChange(Number(value))} defaultValue={String(field.value)}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Rate our service from 1 to 5" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                        <SelectItem value="5">⭐⭐⭐⭐⭐ (Excellent)</SelectItem>
                        <SelectItem value="4">⭐⭐⭐⭐ (Good)</SelectItem>
                        <SelectItem value="3">⭐⭐⭐ (Average)</SelectItem>
                        <SelectItem value="2">⭐⭐ (Below Average)</SelectItem>
                        <SelectItem value="1">⭐ (Poor)</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Comments</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us more about your experience..."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Submit Feedback</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
