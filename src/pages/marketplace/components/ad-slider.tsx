"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Play, Pause } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";

const ads = [
  {
    id: 1,
    title: "Eco-Friendly Furniture Sale",
    image: "/placeholder.svg?height=400&width=800",
    description: "Up to 30% off on recycled wood furniture",
  },
  {
    id: 2,
    title: "Electronics Trade-In Program",
    image: "/placeholder.svg?height=400&width=800",
    description: "Get store credit for your old devices",
  },
  {
    id: 3,
    title: "Sustainable Fashion Week",
    image: "/placeholder.svg?height=400&width=800",
    description: "Discover eco-conscious clothing brands",
  },
];

export default function AdSlider() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [isPlaying, setIsPlaying] = React.useState(true);

  React.useEffect(() => {
    if (!emblaApi) return;

    let intervalId: NodeJS.Timeout | null = null;

    if (isPlaying) {
      intervalId = setInterval(() => {
        if (emblaApi) {
          console.log("Auto-scrolling to the next slide");
          emblaApi.scrollNext(); // Always scroll to the next slide
        }
      }, 5000); // Change slide every 5 seconds
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [emblaApi, isPlaying]);

  const toggleAutoplay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
        ref={emblaRef}
      >
        <CarouselContent>
          {ads.map((ad) => (
            <CarouselItem key={ad.id}>
              <Card>
                <CardContent className="relative flex aspect-[2/1] items-center justify-center p-0">
                  <img src={ad.image} alt={ad.title} className="object-cover" />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-end p-6 text-white">
                    <h2 className="text-2xl font-bold mb-2">{ad.title}</h2>
                    <p>{ad.description}</p>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <Button
        variant="secondary"
        size="icon"
        className="absolute bottom-4 right-4 z-10"
        onClick={toggleAutoplay}
      >
        {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
      </Button>
    </div>
  );
}
