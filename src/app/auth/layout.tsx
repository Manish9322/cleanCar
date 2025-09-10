import Link from "next/link";
import { Car } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
            <Link href="/" className="flex items-center space-x-2 text-foreground">
              <Car className="h-8 w-8" />
              <span className="text-2xl font-bold">AquaShine</span>
            </Link>
        </div>
        {children}
      </div>
    </div>
  );
}
