import Image from "next/image";
import { Award, Target, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const aboutImage = PlaceHolderImages.find(p => p.id === 'about-us-image');

export default function AboutPage() {
  return (
    <>
      <section className="w-full bg-primary/90">
        <div className="container text-center text-primary-foreground py-16 md:py-24">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl font-headline">
            About AquaShine
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-primary-foreground/80">
            Discover our passion for making cars look their absolute best.
          </p>
        </div>
      </section>

      <div className="container py-12 md:py-24 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold font-headline">Our Story</h2>
            <p className="text-muted-foreground">
              AquaShine started in a small garage with a big dream: to provide a car wash service that was a cut above the rest. Founded by a group of auto enthusiasts, we were tired of services that cut corners and left cars looking less than perfect. We knew we could do better.
            </p>
            <p className="text-muted-foreground">
              With a focus on quality, customer service, and using only the best products, we've grown into the most trusted name in car care in the area. Our mission is simple: to give every car the shine it deserves and every customer a reason to smile.
            </p>
          </div>
          <div>
            {aboutImage && (
              <Image
                src={aboutImage.imageUrl}
                alt={aboutImage.description}
                data-ai-hint={aboutImage.imageHint}
                width={800}
                height={600}
                className="rounded-lg shadow-lg"
              />
            )}
          </div>
        </div>
        
        <div className="mt-24">
           <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline">Our Values</h2>
              <p className="mt-2 text-lg text-muted-foreground">
                The principles that guide us every day.
              </p>
            </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader className="items-center">
                <Award className="w-10 h-10 mb-2 text-primary"/>
                <CardTitle>Quality</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground">We use premium products and meticulous techniques to ensure a flawless finish every time.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="items-center">
                <Users className="w-10 h-10 mb-2 text-primary"/>
                <CardTitle>Customer Focus</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground">Your satisfaction is our top priority. We listen to your needs and strive to exceed your expectations.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="items-center">
                <Target className="w-10 h-10 mb-2 text-primary"/>
                <CardTitle>Integrity</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground">We operate with honesty and transparency, building lasting relationships with our customers.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
