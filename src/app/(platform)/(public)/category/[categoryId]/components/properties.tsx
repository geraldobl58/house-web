"use client";

import Image from "next/image";

import { Card } from "@/components/ui/card";

import { Property } from "@/types/property";

import { PropertiesCard } from "./properties-card";
import { PropertiesCarousel } from "./properties-carousel";

export const Properties = ({ data }: Property) => {
  if (data.length === 0) {
    return (
      <div className="pt-10 flex flex-col items-center justify-center">
        <div className="relative w-60 h-60">
          <Image fill alt="" className="grayscale" src="/error-page-img.svg" />
        </div>
        <p className="text-sm text-muted-foreground">
          Oops! Não existe imóvel no momento!
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-2 pb-10 m-2">
      {data.map((item) => (
        <Card
          key={item.id}
          className="bg-primary/10 rounded-xl transition border-0 p-2 flex"
        >
          <PropertiesCarousel item={item.images} />

          <PropertiesCard
            id={item.id}
            name={item.name}
            address={item.address}
            neighborhood={item.neighborhood}
            description={item.description}
            garage={item.garage}
            bathroom={item.bathroom}
            bedroom={item.bedroom}
            price={item.price}
          />
        </Card>
      ))}
    </div>
  );
};

export default Properties;
