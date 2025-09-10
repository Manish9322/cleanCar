import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const heroImage = PlaceHolderImages.find(p => p.id === 'hero-image');
const serviceImages = [
  PlaceHolderImages.find(p => p.id === 'basic-wash'),
  PlaceHolderImages.find(p => p.id === 'deluxe-detail'),
  PlaceHolderImages.find(p => p.id === 'premium-shine'),
];

const galleryImages = [
  { id: 'gallery-1', src: 'https://picsum.photos/seed/gallery1/800/600', alt: 'Clean sports car', hint: 'sports car' },
  { id: 'gallery-2', src: 'https://picsum.photos/seed/gallery2/800/600', alt: 'Sparkling clean sedan', hint: 'sedan car' },
  { id: 'gallery-3', src: 'https://picsum.photos/seed/gallery3/800/600', alt: 'SUV after a wash', hint: 'clean suv' },
  { id: 'gallery-4', src: 'https://picsum.photos/seed/gallery4/800/600', alt: 'Immaculate car interior', hint: 'car interior' },
  { id: 'gallery-5', src: 'https://picsum.photos/seed/gallery5/800/600', alt: 'Polished car hood', hint: 'car polish' },
  { id: 'gallery-6', src: 'https://picsum.photos/seed/gallery6/800/600', alt: 'Another shiny car', hint: 'shiny car' }
]

const services = [
  {
    title: "Basic Wash",
    description: "A quick and efficient exterior wash to make your car sparkle.",
    price: "$25",
    image: serviceImages[0],
  },
  {
    title: "Deluxe Detail",
    description: "Complete interior and exterior cleaning for a showroom look.",
    price: "$75",
    image: serviceImages[1],
  },
  {
    title: "Premium Shine",
    description: "Our best package, including wax and polish for ultimate protection.",
    price: "$125",
    image: serviceImages[2],
  },
];

const testimonials = [
  {
    name: "Sarah L.",
    avatar: "https://picsum.photos/seed/avatar1/100/100",
    text: "My car has never looked better! The attention to detail was incredible. The Premium Shine package is worth every penny. I'll definitely be coming back."
  },
  {
    name: "Mike D.",
    avatar: "https://picsum.photos/seed/avatar2/100/100",
    text: "AquaShine is the best car wash in town. Fast, friendly, and my car looks brand new. The deluxe detail was thorough and left my interior spotless."
  },
  {
    name: "Jessica P.",
    avatar: "https://picsum.photos/seed/avatar3/100/100",
    text: "I was so impressed with the quality of the wash. The staff was professional and courteous. It's so convenient to book online. Highly recommended!"
  }
];

const teamMembers = [
  {
    name: "John Doe",
    role: "Master Detailer",
    avatar: "https://picsum.photos/seed/team1/200/200",
    hint: 'male face'
  },
  {
    name: "Jane Smith",
    role: "Shine Specialist",
    avatar: "https://picsum.photos/seed/team2/200/200",
    hint: 'female face'
  },
  {
    name: "Sam Wilson",
    role: "Lead Technician",
    avatar: "https://picsum.photos/seed/team3/200/200",
    hint: 'male face'
  }
];

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <section className="w-full bg-primary">
        <div className="container flex flex-col items-center justify-center text-center text-primary-foreground p-8 md:p-16">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl font-headline">
            The Ultimate Shine for Your Ride
          </h1>
          <p className="mt-4 max-w-2xl text-lg md:text-xl text-primary-foreground/80">
            Experience the best car wash in town. We treat every car like our own.
          </p>
          <Button asChild size="lg" className="mt-8 bg-background text-foreground hover:bg-background/90">
            <Link href="/book">Book Your Wash Today</Link>
          </Button>
        </div>
      </section>

      <section id="services" className="py-12 md:py-24">
        <div className="container max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline">Our Services</h2>
            <p className="mt-2 text-lg text-muted-foreground">
              Choose the perfect package for your car's needs.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {services.map((service) => (
              <Card key={service.title} className="flex flex-col overflow-hidden transition-shadow hover:shadow-lg">
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
            ))}
          </div>
        </div>
      </section>
      
      <section id="testimonials" className="py-12 md:py-24 bg-muted">
        <div className="container max-w-7xl">
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
        <div className="container max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline">Our Work</h2>
            <p className="mt-2 text-lg text-muted-foreground">
              A glimpse of our showroom-quality results.
            </p>
          </div>
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
                    <Card className="overflow-hidden">
                       <div className="relative aspect-video">
                        <Image
                          src={image.src}
                          alt={image.alt}
                          data-ai-hint={image.hint}
                          fill
                          className="object-cover transition-transform hover:scale-105"
                        />
                      </div>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>

      <section id="team" className="py-12 md:py-24 bg-muted">
        <div className="container max-w-7xl">
           <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline">Meet the Team</h2>
            <p className="mt-2 text-lg text-muted-foreground">
              The experts behind your car's shine.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
               <Card key={member.name} className="text-center">
                 <CardContent className="pt-6">
                   <Avatar className="w-24 h-24 mx-auto mb-4">
                     <AvatarImage src={member.avatar} alt={member.name} data-ai-hint={member.hint} />
                     <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                   </Avatar>
                   <h3 className="text-xl font-semibold">{member.name}</h3>
                   <p className="text-primary">{member.role}</p>
                 </CardContent>
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

      <section id="cta" className="py-12 md:py-24 bg-primary text-primary-foreground">
        <div className="container text-center">
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
