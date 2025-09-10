import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const heroImage = PlaceHolderImages.find(p => p.id === 'hero-image');
const serviceImages = [
  PlaceHolderImages.find(p => p.id === 'basic-wash'),
  PlaceHolderImages.find(p => p.id === 'deluxe-detail'),
  PlaceHolderImages.find(p => p.id === 'premium-shine'),
];

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

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <section className="relative w-full h-[60vh] md:h-[80vh]">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            data-ai-hint={heroImage.imageHint}
            fill
            className="object-cover"
            priority
          />
        )}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-primary-foreground bg-black/50 p-4">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl font-headline">
            The Ultimate Shine for Your Ride
          </h1>
          <p className="mt-4 max-w-2xl text-lg md:text-xl">
            Experience the best car wash in town. We treat every car like our own.
          </p>
          <Button asChild size="lg" className="mt-8">
            <Link href="/book">Book Your Wash Today</Link>
          </Button>
        </div>
      </section>

      <section id="services" className="py-12 md:py-24">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline">Our Services</h2>
            <p className="mt-2 text-lg text-muted-foreground">
              Choose the perfect package for your car's needs.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {services.map((service) => (
              <Card key={service.title} className="flex flex-col overflow-hidden">
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
                  <p>{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
