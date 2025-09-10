"use client"

import { useGetFeedbackQuery, useUpdateFeedbackMutation, useDeleteFeedbackMutation } from "@/lib/api";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MoreHorizontal, Star, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

const statusVariant = {
  Published: "default",
  Archived: "secondary",
  New: "outline"
} as const;

function FeedbackSkeleton() {
    return (
        <TableRow>
            <TableCell>
                 <div className="flex items-center gap-3">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <Skeleton className="h-4 w-24" />
                </div>
            </TableCell>
            <TableCell><Skeleton className="h-4 w-full" /></TableCell>
            <TableCell><Skeleton className="h-4 w-12" /></TableCell>
            <TableCell><Skeleton className="h-4 w-24" /></TableCell>
            <TableCell><Skeleton className="h-6 w-20 rounded-full" /></TableCell>
            <TableCell><Skeleton className="h-8 w-8" /></TableCell>
        </TableRow>
    )
}

export default function AdminFeedbackPage() {
  const { data: feedbacks, isLoading, isError, error } = useGetFeedbackQuery(undefined);
  const [updateFeedback, { isLoading: isUpdating }] = useUpdateFeedbackMutation();
  const [deleteFeedback, { isLoading: isDeleting }] = useDeleteFeedbackMutation();
  const { toast } = useToast();

  const handleUpdateStatus = async (id: string, status: 'Published' | 'Archived' | 'New') => {
    try {
        await updateFeedback({ id, status }).unwrap();
        toast({ title: 'Success', description: `Feedback status updated to ${status}`});
    } catch (err) {
        toast({ title: 'Error', description: 'Failed to update feedback status.', variant: 'destructive'});
    }
  }
  
  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure? This will permanently delete this feedback.")) return;
    try {
      await deleteFeedback(id).unwrap();
      toast({ title: 'Success', description: 'Feedback deleted successfully.' });
    } catch (err) {
      toast({ title: 'Error', description: 'Failed to delete feedback.', variant: 'destructive' });
    }
  };

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
              {isLoading ? (
                  Array.from({length: 4}).map((_, i) => <FeedbackSkeleton key={i} />)
              ) : isError ? (
                     <TableRow>
                        <TableCell colSpan={6} className="text-center text-destructive">
                             Failed to load feedback: {(error as any)?.data?.message || 'Server error'}
                        </TableCell>
                    </TableRow>
              ) : (feedbacks?.data.map((feedback: any) => (
                <TableRow key={feedback._id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={`https://picsum.photos/seed/${feedback._id}/100/100`} alt={feedback.name} />
                        <AvatarFallback>{feedback.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{feedback.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="max-w-sm truncate text-muted-foreground">{feedback.feedback}</TableCell>
                  <TableCell>
                    <div className="flex items-center justify-center gap-1">
                      {feedback.rating || 'N/A'} <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    </div>
                  </TableCell>
                  <TableCell>{new Date(feedback.createdAt).toLocaleDateString()}</TableCell>
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
                        {feedback.status !== 'Published' && <DropdownMenuItem onClick={() => handleUpdateStatus(feedback._id, 'Published')} disabled={isUpdating}>Publish</DropdownMenuItem>}
                        {feedback.status === 'Published' && <DropdownMenuItem onClick={() => handleUpdateStatus(feedback._id, 'New')} disabled={isUpdating}>Unpublish</DropdownMenuItem>}
                        {feedback.status !== 'Archived' &&<DropdownMenuItem onClick={() => handleUpdateStatus(feedback._id, 'Archived')} disabled={isUpdating}>Archive</DropdownMenuItem>}
                        <DropdownMenuItem className="text-destructive" onClick={() => handleDelete(feedback._id)} disabled={isDeleting}>
                            {isDeleting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Delete'}
                        </DropdownMenuItem>
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
