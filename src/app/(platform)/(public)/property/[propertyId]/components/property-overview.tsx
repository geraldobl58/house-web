import { Separator } from "@/components/ui/separator";
import { Category, Property } from "@prisma/client";

import { Bath, Bed, CarFront, Home, Scan } from "lucide-react";

interface PropertyOverviewProps {
  property: Property & {
    category: Category;
  };
}

export const PropertyOverview = ({ property }: PropertyOverviewProps) => {
  return (
    <div className="bg-gray-100 p-4 rounded-lg mb-4 space-y-4">
      <h3 className="text-muted-foreground">Imovel</h3>

      <div className="grid grid-cols-4 gap-2 space-x-4">
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

      <Separator />

      <div className="grid grid-cols-4 gap-2 space-x-4">
        <div className="flex items-center">
          <Scan className="text-muted-foreground" />
          <span className="ml-2 text-xs text-muted-foreground">
            {property.sqft} Metros(s)
          </span>
        </div>
        <div className="flex items-center">
          <Home className="text-muted-foreground" />
          <span className="ml-2 text-xs text-muted-foreground">
            {property.category.name}
          </span>
        </div>
      </div>
    </div>
  );
};
