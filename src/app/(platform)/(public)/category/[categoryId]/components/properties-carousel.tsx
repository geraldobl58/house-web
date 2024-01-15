import Image from "next/image";

import { Card, CardContent } from "@/components/ui/card";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface PropertiesCarouselProps {
  item: any[];
}

export const PropertiesCarousel = ({ item }: PropertiesCarouselProps) => {
  return (
    <Carousel className="w-[500px]">
      <CarouselContent>
        {item.map((image, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card>
                <CardContent className="flex items-center justify-center p-6 ">
                  <Image
                    alt=""
                    width={500}
                    height={300}
                    src={image}
                    className="rounded-xl object-cover hover:opacity-75 w-[500px] h-[300px]"
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-10" />
      <CarouselNext className="right-10" />
    </Carousel>
  );
};
