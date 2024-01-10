"use client";

import Image from "next/image";

import { Card } from "@/components/ui/card";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface CoverGalleryProps {
  items: any[];
}

export const CoverGallery = ({ items }: CoverGalleryProps) => {
  return (
    <Carousel className="w-full h-[200px] max-w-xs">
      <CarouselContent>
        {items.images.map((image) => {
          return (
            <CarouselItem key={image.id}>
              <Card>
                <Image
                  width={350}
                  height={350}
                  alt=""
                  src={image.url}
                  className="rounded-xl object-cover"
                />
              </Card>
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <CarouselPrevious className="left-1" />
      <CarouselNext className="right-1" />
    </Carousel>
  );
};
