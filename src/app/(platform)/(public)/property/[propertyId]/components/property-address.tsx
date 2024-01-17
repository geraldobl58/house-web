import { Property } from "@prisma/client";

interface PropertyAddressProps {
  property: Property;
}

export const PropertyAddress = ({ property }: PropertyAddressProps) => {
  return (
    <div className="bg-gray-100 p-4 rounded-lg mb-4 space-y-4">
      <h3 className="text-muted-foreground">Endereço</h3>

      <p className="text-sm">
        Rua:
        <span className="text-muted-foreground ml-2 text-sm">
          {property.address}
        </span>
      </p>
      <p className="text-sm">
        Bairro:
        <span className="text-muted-foreground ml-2 text-sm">
          {property.neighborhood}
        </span>
      </p>
    </div>
  );
};
