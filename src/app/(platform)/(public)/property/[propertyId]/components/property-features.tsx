import { Property } from "@prisma/client";
import { CheckCircle2 } from "lucide-react";

interface PropertyFeaturesProps {
  property: Property;
}

export const PropertyFeatures = ({ property }: PropertyFeaturesProps) => {
  return (
    <div className="bg-gray-100 p-4 rounded-lg mb-4 space-y-4">
      <h3 className="text-muted-foreground">Features & Amenities</h3>
      <div className="grid grid-cols-4 gap-4">
        <p className="text-sm">
          {property.grill && (
            <>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="text-primary" /> Churraqueira
              </span>
            </>
          )}
        </p>
        <p className="text-sm">
          {property.pool && (
            <>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="text-primary" /> Piscina
              </span>
            </>
          )}
        </p>
      </div>
    </div>
  );
};
