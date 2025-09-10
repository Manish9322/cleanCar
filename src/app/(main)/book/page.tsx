import { BookingForm } from "./booking-form";
import { Car, Clock, ShieldCheck } from "lucide-react";

export default function BookPage() {
  return (
    <>
      <section className="w-full bg-primary/90">
        <div className="container text-center text-primary-foreground py-16 md:py-24">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl font-headline">
            Book Your Wash
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-primary-foreground/80">
            Select your preferred service, date, and time. We'll take care of the rest.
          </p>
        </div>
      </section>
      
      <div className="container py-12 md:py-24">
        <div className="max-w-4xl mx-auto">
          <BookingForm />
        </div>
      </div>

      <section className="bg-muted py-12 md:py-24">
        <div className="container max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <Car className="w-12 h-12 text-primary mb-4"/>
              <h3 className="text-xl font-bold">Expert Technicians</h3>
              <p className="text-muted-foreground mt-2">Our team is trained to treat your car with the utmost care and precision.</p>
            </div>
            <div className="flex flex-col items-center">
              <Clock className="w-12 h-12 text-primary mb-4"/>
              <h3 className="text-xl font-bold">Fast & Convenient</h3>
              <p className="text-muted-foreground mt-2">Book your slot in minutes and enjoy a swift, hassle-free service.</p>
            </div>
            <div className="flex flex-col items-center">
              <ShieldCheck className="w-12 h-12 text-primary mb-4"/>
              <h3 className="text-xl font-bold">Satisfaction Guaranteed</h3>
              <p className="text-muted-foreground mt-2">We're not happy until you're happy. We stand by our quality work.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
