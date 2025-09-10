"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Award, Car, Facebook, Instagram, Linkedin, Star, Twitter, Users, TrendingUp, MessageSquare } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";


const heroImage = PlaceHolderImages.find(p => p.id === 'hero-image');
const serviceImages = [
  PlaceHolderImages.find(p => p.id === 'basic-wash'),
  PlaceHolderImages.find(p => p.id === 'deluxe-detail'),
  PlaceHolderImages.find(p => p.id === 'premium-shine'),
];

const galleryImages = [
  PlaceHolderImages.find(p => p.id === 'gallery-1'),
  PlaceHolderImages.find(p => p.id === 'gallery-2'),
  PlaceHolderImages.find(p => p.id === 'gallery-3'),
  PlaceHolderImages.find(p => p.id === 'gallery-4'),
  PlaceHolderImages.find(p => p.id === 'gallery-5'),
  PlaceHolderImages.find(p => p.id === 'gallery-6')
];

const services = [
  {
    title: "Basic Wash",
    description: "A quick and efficient exterior wash to make your car sparkle.",
    price: "₹999",
    image: serviceImages[0],
  },
  {
    title: "Deluxe Detail",
    description: "Complete interior and exterior cleaning for a showroom look.",
    price: "₹1999",
    image: serviceImages[1],
  },
  {
    title: "Premium Shine",
    description: "Our best package, including wax and polish for ultimate protection.",
    price: "₹2999",
    image: serviceImages[2],
  },
];

const testimonials = [
  {
    name: "Sarah L.",
    avatar: "https://picsum.photos/seed/101/100/100",
    text: "My car has never looked better! The attention to detail was incredible. The Premium Shine package is worth every penny. I'll definitely be coming back."
  },
  {
    name: "Mike D.",
    avatar: "https://picsum.photos/seed/102/100/100",
    text: "AquaShine is the best car wash in town. Fast, friendly, and my car looks brand new. The deluxe detail was thorough and left my interior spotless."
  },
  {
    name: "Jessica P.",
    avatar: "https://picsum.photos/seed/103/100/100",
    text: "I was so impressed with the quality of the wash. The staff was professional and courteous. It's so convenient to book online. Highly recommended!"
  }
];

const teamMembers = [
  {
    name: "John Doe",
    role: "Master Detailer",
    bio: "With over 10 years of experience, John is the heart of our detailing operations, ensuring every car leaves looking its absolute best.",
    avatar: "https://picsum.photos/seed/104/200/200",
    hint: 'male face'
  },
  {
    name: "Jane Smith",
    role: "Shine Specialist",
    bio: "Jane's passion for perfection and expertise in polishing and waxing guarantees a mirror-like finish on every vehicle.",
    avatar: "https://picsum.photos/seed/105/200/200",
    hint: 'female face'
  },
  {
    name: "Sam Wilson",
    role: "Lead Technician",
    bio: "Sam leads our team of technicians with a focus on efficiency, quality, and pioneering new car care techniques.",
    avatar: "https://picsum.photos/seed/106/200/200",
    hint: 'male face'
  }
];

const feedbackFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  feedback: z.string().min(10, "Feedback must be at least 10 characters."),
});

type FeedbackFormValues = z.infer<typeof feedbackFormSchema>;


function FeedbackForm() {
    const { toast } = useToast();
    const form = useForm<FeedbackFormValues>({
      resolver: zodResolver(feedbackFormSchema),
      defaultValues: { name: "", email: "", feedback: "" },
    });

    function onSubmit(data: FeedbackFormValues) {
        console.log(data);
        toast({
        title: "Feedback Submitted!",
        description: "Thank you for sharing your thoughts with us.",
        });
        form.reset();
    }
    
    return (
        <Card className="max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle>Share Your Feedback</CardTitle>
                <CardDescription>We value your opinion. Let us know how we're doing.</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                        </div>
                        <FormField
                            control={form.control}
                            name="feedback"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Feedback</FormLabel>
                                <FormControl>
                                <Textarea placeholder="Tell us what you think..." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full">Submit Feedback</Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}


export default function HomePage() {
  const [selectedImage, setSelectedImage] = useState<typeof galleryImages[0] | null>(null);
  
  return (
    <div className="flex flex-col">
      <section className="w-full bg-primary overflow-hidden">
        <div className="container flex flex-col items-center justify-center text-center text-primary-foreground p-8 md:p-16 relative">
           <div className="absolute top-0 left-0 w-full h-full bg-grid-white/[0.05] z-0" />
           <div className="z-10 max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl font-headline">
              The Ultimate Shine for Your Ride
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-primary-foreground/80">
              Experience the best car wash in town. We treat every car like our own, using premium products to deliver a showroom finish, every time.
            </p>
            <Button asChild size="lg" className="mt-8 bg-background text-foreground hover:bg-background/90">
              <Link href="/book">Book Your Wash Today</Link>
            </Button>
          </div>
          <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 text-left z-10">
            <Card className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center gap-4">
                    <div className="bg-background/20 p-3 rounded-full">
                        <Car className="h-6 w-6 text-background" />
                    </div>
                    <div>
                        <p className="text-2xl font-bold">10,000+</p>
                        <p className="text-sm text-primary-foreground/80">Cars Washed</p>
                    </div>
                </CardHeader>
            </Card>
             <Card className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center gap-4">
                     <div className="bg-background/20 p-3 rounded-full">
                        <Users className="h-6 w-6 text-background" />
                    </div>
                    <div>
                        <p className="text-2xl font-bold">5,000+</p>
                        <p className="text-sm text-primary-foreground/80">Happy Customers</p>
                    </div>
                </CardHeader>
            </Card>
             <Card className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground backdrop-blur-sm">
                 <CardHeader className="flex flex-row items-center gap-4">
                    <div className="bg-background/20 p-3 rounded-full">
                        <TrendingUp className="h-6 w-6 text-background" />
                    </div>
                    <div>
                        <p className="text-2xl font-bold">98%</p>
                        <p className="text-sm text-primary-foreground/80">Satisfaction Rate</p>
                    </div>
                </CardHeader>
            </Card>
          </div>
        </div>
         <div className="relative h-10 w-full overflow-hidden bg-background text-foreground">
            <div className="absolute inset-0 whitespace-nowrap animate-marquee flex items-center">
                <span className="mx-4 font-semibold text-lg">PREMIUM WAX & POLISH</span>
                <Star className="mx-4 h-5 w-5 text-primary" />
                <span className="mx-4 font-semibold text-lg">INTERIOR DEEP CLEAN</span>
                 <Star className="mx-4 h-5 w-5 text-primary" />
                <span className="mx-4 font-semibold text-lg">SHOWROOM FINISH GUARANTEED</span>
                 <Star className="mx-4 h-5 w-5 text-primary" />
                 <span className="mx-4 font-semibold text-lg">ECO-FRIENDLY PRODUCTS</span>
                 <Star className="mx-4 h-5 w-5 text-primary" />
            </div>
             <div className="absolute inset-0 whitespace-nowrap animate-marquee2 flex items-center">
                <span className="mx-4 font-semibold text-lg">PREMIUM WAX & POLISH</span>
                <Star className="mx-4 h-5 w-5 text-primary" />
                <span className="mx-4 font-semibold text-lg">INTERIOR DEEP CLEAN</span>
                 <Star className="mx-4 h-5 w-5 text-primary" />
                <span className="mx-4 font-semibold text-lg">SHOWROOM FINISH GUARANTEED</span>
                 <Star className="mx-4 h-5 w-5 text-primary" />
                 <span className="mx-4 font-semibold text-lg">ECO-FRIENDLY PRODUCTS</span>
                 <Star className="mx-4 h-5 w-5 text-primary" />
            </div>
        </div>
      </section>

      <section id="services" className="py-12 md:py-24">
        <div className="container max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline">Our Services</h2>
            <p className="mt-2 text-lg text-muted-foreground">
              Choose the perfect package for your car's needs.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {services.map((service) => (
              <Link href="/book" key={service.title} className="block">
                <Card className="flex flex-col overflow-hidden transition-shadow hover:shadow-lg h-full">
                  {service.image && (
                     <div className="relative h-64 w-full">
                      <Image
                        src={service.image.imageUrl}
                        alt={service.image.description}
                        data-ai-hint={service.image.imageHint}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle>{service.title}</CardTitle>
                    <CardDescription className="text-2xl font-bold text-primary">{service.price}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <p className="text-muted-foreground">{service.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      <section id="testimonials" className="py-12 md:py-24 bg-muted">
        <div className="container max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline">What Our Customers Say</h2>
            <p className="mt-2 text-lg text-muted-foreground">
              Hear from our happy clients.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.name}>
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    <Avatar className="h-12 w-12 mr-4">
                      <AvatarImage src={testimonial.avatar} alt={testimonial.name} data-ai-hint="person face" />
                      <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                       <div className="flex text-yellow-500">
                          <Star className="h-4 w-4 fill-current" /><Star className="h-4 w-4 fill-current" /><Star className="h-4 w-4 fill-current" /><Star className="h-4 w-4 fill-current" /><Star className="h-4 w-4 fill-current" />
                       </div>
                    </div>
                  </div>
                  <p className="text-muted-foreground italic">"{testimonial.text}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="gallery" className="py-12 md:py-24">
        <div className="container max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline">Our Work</h2>
            <p className="mt-2 text-lg text-muted-foreground">
              A glimpse of our showroom-quality results.
            </p>
          </div>
          <Dialog>
             <Carousel
                opts={{
                  align: "start",
                  loop: true,
                }}
                className="w-full"
              >
                <CarouselContent>
                  {galleryImages.map((image) => (
                    <CarouselItem key={image.id} className="md:basis-1/2 lg:basis-1/3">
                      <div className="p-1">
                        <DialogTrigger asChild onClick={() => setSelectedImage(image)}>
                            <Card className="overflow-hidden cursor-pointer">
                              <div className="relative aspect-video">
                                <Image
                                  src={image.imageUrl}
                                  alt={image.description}
                                  data-ai-hint={image.imageHint}
                                  fill
                                  className="object-cover transition-transform hover:scale-105"
                                />
                              </div>
                            </Card>
                        </DialogTrigger>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>

              {selectedImage && (
                <DialogContent className="max-w-3xl">
                  <DialogHeader>
                    <DialogTitle>{selectedImage.description}</DialogTitle>
                  </DialogHeader>
                  <div className="relative aspect-video">
                     <Image
                        src={selectedImage.imageUrl}
                        alt={selectedImage.description}
                        fill
                        className="object-contain rounded-md"
                      />
                  </div>
                </DialogContent>
              )}
          </Dialog>
        </div>
      </section>

      <section id="team" className="py-12 md:py-24 bg-muted">
        <div className="container max-w-7xl mx-auto">
           <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline">Meet the Team</h2>
            <p className="mt-2 text-lg text-muted-foreground">
              The experts behind your car's shine.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
               <Card key={member.name} className="text-center overflow-hidden group">
                 <div className="relative h-48">
                    <Image src={member.avatar} alt={member.name} data-ai-hint={member.hint} fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-300" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                     <div className="absolute bottom-4 left-4 text-left text-white">
                        <h3 className="text-xl font-bold">{member.name}</h3>
                        <p className="text-primary-foreground/80">{member.role}</p>
                    </div>
                 </div>
                 <CardContent className="pt-6 text-left">
                   <p className="text-muted-foreground text-sm">{member.bio}</p>
                 </CardContent>
                 <CardFooter className="flex justify-center gap-4 pb-6">
                    <Link href="#" className="text-muted-foreground hover:text-primary"><Twitter className="h-5 w-5" /></Link>
                    <Link href="#" className="text-muted-foreground hover:text-primary"><Facebook className="h-5 w-5" /></Link>
                    <Link href="#" className="text-muted-foreground hover:text-primary"><Linkedin className="h-5 w-5" /></Link>
                 </CardFooter>
               </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="py-12 md:py-24">
        <div className="container max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline">Frequently Asked Questions</h2>
          </div>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>How long does a car wash take?</AccordionTrigger>
              <AccordionContent>
                Our Basic Wash takes about 20-30 minutes. The Deluxe Detail takes 1-2 hours, and the Premium Shine can take 2-3 hours depending on the vehicle's condition.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Do I need an appointment?</AccordionTrigger>
              <AccordionContent>
                Appointments are highly recommended to ensure we can service your vehicle promptly. You can book easily through our website. We do accept walk-ins, but there may be a wait.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>What kind of products do you use?</AccordionTrigger>
              <AccordionContent>
                We use only high-quality, eco-friendly cleaning products that are safe for your car and the environment. Our waxes and polishes provide long-lasting protection and shine.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>What if it rains after my car wash?</AccordionTrigger>
              <AccordionContent>
                We offer a 48-hour rain guarantee. If it rains within 48 hours of your exterior wash, bring it back and we'll re-wash the exterior for free! (Valid for Deluxe and Premium packages).
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      <section id="feedback" className="py-12 md:py-24 bg-muted">
        <div className="container max-w-7xl mx-auto">
            <FeedbackForm />
        </div>
      </section>

      <section id="cta" className="py-12 md:py-24 bg-primary text-primary-foreground">
        <div className="container text-center max-w-7xl mx-auto">
           <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline">Ready for a Flawless Shine?</h2>
            <p className="mt-2 text-lg text-primary-foreground/80">
              Your car deserves the best. Book your appointment today and experience the AquaShine difference.
            </p>
           <Button asChild size="lg" className="mt-8 bg-background text-foreground hover:bg-background/90">
            <Link href="/book">Book Now</Link>
          </Button>
        </div>
      </section>

    </div>
  );
}
