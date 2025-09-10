import Image from "next/image";
import { Award, Target, Users, ShieldCheck, Leaf, Sparkles, Heart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const aboutImage = PlaceHolderImages.find(p => p.id === 'about-us-image');
const ourProcessImage = PlaceHolderImages.find(p => p.id === 'our-process-image');

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
        
        <div className="mt-24 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline">Our Mission & Vision</h2>
            <p className="mt-2 text-lg text-muted-foreground max-w-3xl mx-auto">
                To redefine excellence in car care by providing unparalleled service, using eco-friendly products, and creating a community of proud car owners. We envision a future where every car on the road reflects the care and pride of its owner.
            </p>
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

        <section id="why-choose-us" className="py-12 md:py-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline">Why Choose AquaShine?</h2>
            <p className="mt-2 text-lg text-muted-foreground">
              What sets us apart from the competition.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="bg-primary/10 p-4 rounded-full mb-4"><Sparkles className="w-8 h-8 text-primary"/></div>
              <h3 className="text-xl font-bold">Impeccable Finish</h3>
              <p className="text-muted-foreground mt-2">Our detailing experts ensure a showroom-quality shine, every single time.</p>
            </div>
            <div className="flex flex-col items-center text-center">
               <div className="bg-primary/10 p-4 rounded-full mb-4"><Leaf className="w-8 h-8 text-primary"/></div>
              <h3 className="text-xl font-bold">Eco-Friendly Products</h3>
              <p className="text-muted-foreground mt-2">We use biodegradable and water-saving products to protect our planet.</p>
            </div>
            <div className="flex flex-col items-center text-center">
               <div className="bg-primary/10 p-4 rounded-full mb-4"><ShieldCheck className="w-8 h-8 text-primary"/></div>
              <h3 className="text-xl font-bold">Satisfaction Guarantee</h3>
              <p className="text-muted-foreground mt-2">If you're not 100% satisfied, we'll make it right. That's our promise to you.</p>
            </div>
             <div className="flex flex-col items-center text-center">
               <div className="bg-primary/10 p-4 rounded-full mb-4"><Heart className="w-8 h-8 text-primary"/></div>
              <h3 className="text-xl font-bold">Passionate Team</h3>
              <p className="text-muted-foreground mt-2">We're car lovers too. We treat every vehicle with the same passion and care as our own.</p>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-24 bg-muted rounded-lg">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="px-8">
              {ourProcessImage && (
                <Image
                  src={ourProcessImage.imageUrl}
                  alt={ourProcessImage.description}
                  data-ai-hint={ourProcessImage.imageHint}
                  width={800}
                  height={600}
                  className="rounded-lg shadow-lg"
                />
              )}
            </div>
            <div className="space-y-6 px-8">
              <h2 className="text-3xl font-bold font-headline">Our Process</h2>
              <ol className="list-decimal list-inside space-y-4 text-muted-foreground">
                <li><span className="font-semibold text-foreground">Consultation:</span> We start by understanding your car's specific needs.</li>
                <li><span className="font-semibold text-foreground">Pre-Wash:</span> Gentle removal of loose dirt and grime to prevent scratches.</li>
                <li><span className="font-semibold text-foreground">Detailed Hand Wash:</span> Using the two-bucket method and pH-neutral shampoos.</li>
                <li><span className="font-semibold text-foreground">Drying & Finishing:</span> Safe drying techniques followed by application of protective waxes or sealants.</li>
                 <li><span className="font-semibold text-foreground">Final Inspection:</span> A rigorous quality check to ensure perfection.</li>
              </ol>
            </div>
          </div>
        </section>

         <section id="cta" className="py-12 md:py-24 text-center">
           <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline">Join the AquaShine Family</h2>
            <p className="mt-2 text-lg text-muted-foreground max-w-2xl mx-auto">
              Ready to give your car the treatment it deserves? Book a service with us today and see the AquaShine difference for yourself.
            </p>
           <Button asChild size="lg" className="mt-8">
            <Link href="/book">Book an Appointment</Link>
          </Button>
        </section>
      </div>
    </>
  );
}
