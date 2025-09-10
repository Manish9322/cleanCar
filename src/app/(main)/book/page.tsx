import { BookingForm } from "./booking-form";

export default function BookPage() {
  return (
    <div className="container py-12 md:py-24">
      <div className="flex flex-col items-center text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl font-headline">Book Your Wash</h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
          Select your preferred service, date, and time. We'll take care of the rest.
        </p>
      </div>
      <div className="mt-12 max-w-3xl mx-auto">
        <BookingForm />
      </div>
    </div>
  );
}
