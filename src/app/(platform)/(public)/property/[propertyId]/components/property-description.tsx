"use client";

import { Property } from "@prisma/client";

interface PropertyDescriptionProps {
  property: Property;
}

export const PropertyDescription = ({ property }: PropertyDescriptionProps) => {
  return (
    <div className="bg-gray-100 p-4 rounded-lg mb-4 space-y-4">
      <h3 className="text-muted-foreground">Descrição</h3>
      <p>{property.description}</p>
    </div>
  );
};
