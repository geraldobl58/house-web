"use client";

import Image from "next/image";

import Link from "next/link";

import { Card, CardHeader } from "@/components/ui/card";

import { PropertiesProps } from "@/types/property";

import { CoverGallery } from "./cover-gallery";

export const Properties = ({ data }: PropertiesProps) => {
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
    <div
      className="
        grid
        grid-cols-1
        gap-2
        pb-10
        m-2
      "
    >
      {data.map((item) => (
        <Card
          key={item.id}
          className="
            bg-primary/10
            rounded-xl
            hover:opacity-75
            transition
            border-0
          "
        >
          <CardHeader
            className="
                flex
                items-center
                justify-center
                text-center
                text-muted-foreground
              "
          >
            <div className="relative w-full h-72">
              <div className="flex">
                <CoverGallery items={item} />
                <Link href={`/properties/${item.id}`}>
                  <p className="ml-3">{item.name}</p>
                  <p className="ml-3">{item.userName}</p>
                </Link>
              </div>
            </div>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
};

export default Properties;
