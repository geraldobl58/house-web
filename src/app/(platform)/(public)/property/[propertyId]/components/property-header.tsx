"use client";

import formatPrice from "@/lib/utils";
import { Business, Property } from "@prisma/client";

import { Bath, Bed, CarFront, Scan } from "lucide-react";

interface PropertyHeaderProps {
  property: Property & {
    business: Business;
  };
}

export const PropertyHeader = ({ property }: PropertyHeaderProps) => {
  return (
    <div className="bg-gray-100 p-4 rounded-lg mb-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold">{property.name}</h1>
        <p>
          Proprietário:
          <span className="ml-2 text-md text-muted-foreground">
            {property.userName}
          </span>
        </p>
      </div>
      <div className="flex items-center gap-2 mt-4 space-x-2">
        <p className="text-muted-foreground">{property.address}</p> |
        <p className="text-muted-foreground">{property.neighborhood}</p> |
        <p className="text-primary">{property.business.name}</p>
      </div>
      <div className="flex items-center justify-between  mt-4 ">
        <div className="flex items-center gap-2 space-x-2">
          <div className="flex items-center">
            <CarFront className="text-muted-foreground" />
            <span className="ml-2 text-xs text-muted-foreground">
              {property.garage} Garagen(s)
            </span>
          </div>
          <div className="flex items-center">
            <Bath className="text-muted-foreground" />
            <span className="ml-2 text-xs text-muted-foreground">
              {property.bathrooms} Banheiro(s)
            </span>
          </div>
          <div className="flex items-center">
            <Bed className="text-muted-foreground" />
            <span className="ml-2 text-xs text-muted-foreground">
              {property.bedrooms} Quarto(s)
            </span>
          </div>
          <div className="flex items-center">
            <Scan className="text-muted-foreground" />
            <span className="ml-2 text-xs text-muted-foreground">
              {property.sqft} Metros(s)
            </span>
          </div>
        </div>
        <div>
          <p className="text-3xl text-primary">{formatPrice(property.price)}</p>
        </div>
      </div>
    </div>
  );
};
