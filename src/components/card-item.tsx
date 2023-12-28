"use client";

import Link from "next/link";

import { Building, HomeIcon } from "lucide-react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

interface CardProps {
  icon: React.ReactNode;
  label: string;
  href: string;
}

const CardItem = () => {
  const cards: CardProps[] = [
    {
      icon: <HomeIcon />,
      label: "Casas",
      href: `/houses`,
    },
    {
      icon: <Building />,
      label: "Apartamentos",
      href: `/apartments`,
    },
  ];

  return (
    <Carousel className="relative bottom-32">
      <CarouselContent className="-ml-1">
        {cards.map((item) => (
          <CarouselItem
            key={item.label}
            className="pl-6 md:basis-1/3 lg:basis-1/5"
          >
            <Link href="" passHref>
              <Card
                className="
                  group
                  hover:bg-gradient-to-r
                  hover:text-white
                  rounded-md
                  bg-white
                  from-sky-500 
                  to-indigo-500
                "
              >
                <CardContent
                  className="
                    flex 
                    aspect-square 
                    items-center 
                    justify-center 
                    p-6
                  "
                >
                  <div
                    className="
                      flex 
                      flex-col 
                      items-center 
                      justify-center 
                      group-hover:scale-105 
                      transition-transform 
                      duration-500
                    "
                  >
                    <div
                      className="
                        bg-indigo-100 
                        hover:bg-indigo-00 
                        p-6 
                        rounded-full
                        group-hover:text-indigo-700
                      "
                    >
                      {item.icon}
                    </div>
                    <div className="mt-8">{item.label}</div>
                    <div className="mt-8">22 imóveis</div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default CardItem;
