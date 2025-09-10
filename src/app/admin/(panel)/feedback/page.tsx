import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MoreHorizontal, Star } from "lucide-react";

const feedbacks = [
  {
    id: "FDBK-001",
    customer: "Sarah L.",
    avatar: "https://picsum.photos/seed/101/100/100",
    date: "2024-08-15",
    rating: 5,
    comment: "My car has never looked better! The attention to detail was incredible. The Premium Shine package is worth every penny.",
    status: "Published",
  },
  {
    id: "FDBK-002",
    customer: "Mike D.",
    avatar: "https://picsum.photos/seed/102/100/100",
    date: "2024-08-18",
    rating: 5,
    comment: "AquaShine is the best car wash in town. Fast, friendly, and my car looks brand new.",
    status: "Published",
  },
  {
    id: "FDBK-003",
    customer: "Jessica P.",
    avatar: "https://picsum.photos/seed/103/100/100",
    date: "2024-08-19",
    rating: 4,
    comment: "Great service, but the waiting area could be a bit more comfortable.",
    status: "Archived",
  },
  {
    id: "FDBK-004",
    customer: "Chris T.",
    avatar: "https://picsum.photos/seed/107/100/100",
    date: "2024-08-20",
    rating: 5,
    comment: "Absolutely fantastic! I'll be recommending you to all my friends.",
    status: "New",
  },
];

const statusVariant = {
  Published: "default",
  Archived: "secondary",
  New: "outline"
} as const;


export default function AdminFeedbackPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold tracking-tight">Feedback Management</h1>
      <Card>
        <CardHeader>
          <CardTitle>Customer Feedback</CardTitle>
          <CardDescription>Review and manage customer feedback and testimonials.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Comment</TableHead>
                <TableHead className="text-center">Rating</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {feedbacks.map((feedback) => (
                <TableRow key={feedback.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={feedback.avatar} alt={feedback.customer} />
                        <AvatarFallback>{feedback.customer.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{feedback.customer}</span>
                    </div>
                  </TableCell>
                  <TableCell className="max-w-sm truncate text-muted-foreground">{feedback.comment}</TableCell>
                  <TableCell>
                    <div className="flex items-center justify-center gap-1">
                      {feedback.rating} <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    </div>
                  </TableCell>
                  <TableCell>{feedback.date}</TableCell>
                  <TableCell>
                    <Badge variant={statusVariant[feedback.status as keyof typeof statusVariant]}>
                      {feedback.status}
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
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>{feedback.status === 'Published' ? 'Unpublish' : 'Publish'}</DropdownMenuItem>
                        <DropdownMenuItem>Archive</DropdownMenuItem>
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
