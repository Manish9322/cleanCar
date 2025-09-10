import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Clock, Loader, Car } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const washStatus = {
    bookingId: "BK-3921",
    service: "Deluxe Detail",
    status: "In Progress",
    progress: 50,
    currentStep: "Interior Cleaning",
    estimatedCompletion: "2:45 PM",
    steps: [
        { name: "Pre-Wash", status: "completed" },
        { name: "Hand Wash & Dry", status: "completed" },
        { name: "Interior Cleaning", status: "in-progress" },
        { name: "Wax & Polish", status: "pending" },
        { name: "Final Inspection", status: "pending" },
    ]
}

const statusIcons = {
    completed: <CheckCircle className="h-6 w-6 text-green-500" />,
    'in-progress': <Loader className="h-6 w-6 text-blue-500 animate-spin" />,
    pending: <Clock className="h-6 w-6 text-muted-foreground" />
}

export default function UserWashStatusPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Live Wash Status</CardTitle>
        <CardDescription>Track the real-time progress of your car wash for booking: <span className="font-semibold text-primary">{washStatus.bookingId}</span></CardDescription>
      </CardHeader>
      <CardContent>
        {washStatus ? (
          <div className="space-y-8">
            <div>
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold">{washStatus.service} - {washStatus.status}</h3>
                <span className="text-lg font-bold text-primary">{washStatus.progress}%</span>
              </div>
              <Progress value={washStatus.progress} className="w-full" />
              <p className="text-sm text-muted-foreground mt-2">Estimated Completion: {washStatus.estimatedCompletion}</p>
            </div>
            
            <Separator />
            
            <div>
              <h4 className="text-md font-semibold mb-4">Progress Details:</h4>
              <ul className="space-y-6">
                {washStatus.steps.map((step, index) => (
                  <li key={index} className="flex items-start gap-4">
                    <div className="flex flex-col items-center">
                      <div className="flex items-center justify-center h-10 w-10 rounded-full bg-muted border">
                        {statusIcons[step.status as keyof typeof statusIcons]}
                      </div>
                      {index < washStatus.steps.length - 1 && (
                        <div className="w-px h-6 bg-border mt-2"></div>
                      )}
                    </div>
                    <div>
                      <p className="font-semibold">{step.name}</p>
                      <p className="text-sm capitalize text-muted-foreground">{step.status.replace('-', ' ')}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <Car className="mx-auto h-12 w-12 text-muted-foreground" />
            <p className="text-muted-foreground mt-4">No active car wash in progress.</p>
            <p className="text-sm text-muted-foreground">The status will appear here once your service begins.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
