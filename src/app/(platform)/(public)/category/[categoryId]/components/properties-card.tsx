import Link from "next/link";

import { Bath, Bed, CarFront } from "lucide-react";

import { Button } from "@/components/ui/button";

import formatPrice from "@/lib/utils";

interface PropertiesCardProps {
  id: string;
  name: string;
  address: string;
  neighborhood: string;
  description: string;
  garage: number;
  bathroom: number;
  bedroom: number;
  price: number;
}

export const PropertiesCard = ({
  id,
  name,
  address,
  neighborhood,
  description,
  garage,
  bathroom,
  bedroom,
  price,
}: PropertiesCardProps) => {
  return (
    <div className="ml-10 p-4 w-[450px] space-y-4">
      <h3 className="font-medium text-2xl text-primary">
        <Link
          href={`/property/${id}`}
          target="_blank"
          className="hover:underline"
        >
          {name}
        </Link>
      </h3>
      <p className="text-sm">{address}</p>
      <p className="text-sm text-muted-foreground">{neighborhood}</p>
      <p className="text-sm text-gray-700">{description}</p>

      <div className="grid grid-cols-3 gap-2">
        <div className="flex items-center">
          <CarFront className="text-muted-foreground" />
          <span className="ml-2 text-xs text-muted-foreground">
            {garage} Garagen(s)
          </span>
        </div>
        <div className="flex items-center">
          <Bath className="text-muted-foreground" />{" "}
          <span className="ml-2 text-xs text-muted-foreground">
            {bathroom} Banheiro(s)
          </span>
        </div>
        <div className="flex items-center">
          <Bed className="text-muted-foreground" />{" "}
          <span className="ml-2 text-xs text-muted-foreground">
            {bedroom} Quarto(s)
          </span>
        </div>
      </div>

      <p className="text-lg text-primary">{formatPrice(price)}</p>

      <div>
        <Link href={`/property/${id}`} target="_blank">
          <Button>Saiba mais</Button>
        </Link>
      </div>
    </div>
  );
};
