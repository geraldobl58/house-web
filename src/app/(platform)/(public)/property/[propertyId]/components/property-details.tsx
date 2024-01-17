import { Business, Category, Property } from "@prisma/client";

import formatPrice from "@/lib/utils";

interface PropertyDetailsProps {
  property: Property & {
    business: Business;
    category: Category;
  };
}

export const PropertyDetails = ({ property }: PropertyDetailsProps) => {
  return (
    <div className="bg-gray-100 p-4 rounded-lg mb-4 space-y-4">
      <h3 className="text-muted-foreground">Detalhes</h3>
      <div className="grid grid-cols-2 gap-2">
        <p>
          ID:
          <span className="text-muted-foreground ml-2 text-sm">
            {property.id}
          </span>
        </p>
        <p>
          Valor:
          <span className="text-muted-foreground ml-2 text-sm">
            {formatPrice(property.price)}
          </span>
        </p>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <p>
          Tipo:
          <span className="text-muted-foreground ml-2 text-sm">
            {property.category.name}
          </span>
        </p>
        <p>
          Status:
          <span className="text-muted-foreground ml-2 text-sm">
            {property.business.name}
          </span>
        </p>
      </div>
    </div>
  );
};
