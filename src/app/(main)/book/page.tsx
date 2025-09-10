import { BookingForm } from "./booking-form";
import { Car, Clock, ShieldCheck, SprayCan, Droplets, Wind, Sparkles } from "lucide-react";

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
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline">What's Included?</h2>
            <p className="mt-2 text-lg text-muted-foreground">
              A detailed look at what each of our packages offer.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <div className="border p-6 rounded-lg bg-card">
              <h3 className="text-2xl font-bold font-headline text-primary">Basic Wash</h3>
              <p className="text-3xl font-bold my-4">₹999</p>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-center gap-2"><Droplets className="text-primary"/>Exterior Hand Wash</li>
                <li className="flex items-center gap-2"><Wind className="text-primary"/>Towel Dry</li>
                <li className="flex items-center gap-2"><SprayCan className="text-primary"/>Wheel Shine</li>
              </ul>
            </div>
             <div className="border p-6 rounded-lg bg-card border-primary shadow-lg">
              <h3 className="text-2xl font-bold font-headline text-primary">Deluxe Detail</h3>
              <p className="text-3xl font-bold my-4">₹1999</p>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-center gap-2"><Droplets className="text-primary"/>Everything in Basic</li>
                <li className="flex items-center gap-2"><Car className="text-primary"/>Interior Vacuum</li>
                <li className="flex items-center gap-2"><SprayCan className="text-primary"/>Dashboard Wipe & Shine</li>
                <li className="flex items-center gap-2"><SprayCan className="text-primary"/>Window Cleaning</li>
              </ul>
            </div>
             <div className="border p-6 rounded-lg bg-card">
              <h3 className="text-2xl font-bold font-headline text-primary">Premium Shine</h3>
              <p className="text-3xl font-bold my-4">₹2999</p>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-center gap-2"><Droplets className="text-primary"/>Everything in Deluxe</li>
                <li className="flex items-center gap-2"><Car className="text-primary"/>Upholstery Shampoo</li>
                <li className="flex items-center gap-2"><Sparkles className="text-primary"/>Hand Wax & Polish</li>
                <li className="flex items-center gap-2"><ShieldCheck className="text-primary"/>Paint Sealant</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background py-12 md:py-24">
        <div className="container max-w-7xl mx-auto">
           <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline">How It Works</h2>
            <p className="mt-2 text-lg text-muted-foreground">
             A simple 3-step process to a sparkling clean car.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary text-primary-foreground font-bold text-2xl mb-4">1</div>
              <h3 className="text-xl font-bold">Book Online</h3>
              <p className="text-muted-foreground mt-2">Choose your desired service, date, and time using our simple booking form.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary text-primary-foreground font-bold text-2xl mb-4">2</div>
              <h3 className="text-xl font-bold">We Come to You</h3>
              <p className="text-muted-foreground mt-2">Our professional team arrives at your location with all the necessary equipment.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary text-primary-foreground font-bold text-2xl mb-4">3</div>
              <h3 className="text-xl font-bold">Enjoy Your Shine</h3>
              <p className="text-muted-foreground mt-2">Sit back and relax. We'll handle the dirty work and leave your car looking brand new.</p>
            </div>
          </div>
        </div>
      </section>

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
