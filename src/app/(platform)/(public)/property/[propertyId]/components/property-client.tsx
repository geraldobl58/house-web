"use client";

import { Business, Category, Image, Property } from "@prisma/client";

import { PropertyHeader } from "./property-header";
import { PropertyDescription } from "./property-description";
import { PropertyDetails } from "./property-details";
import { PropertyAddress } from "./property-address";
import { PropertyFeatures } from "./property-features";
import { PropertyOverview } from "./property-overview";
import { PropertyGallery } from "./property-gallery";

import { PropertyContact } from "./property-contact";

interface PropertyClientProps {
  property: Property & {
    business: Business;
    category: Category;
    images: Image[];
  };
}

export const PropertyClient = ({ property }: PropertyClientProps) => {
  return (
    <div className="flex justify-between space-x-4">
      <div className="w-[1000px] space-y-8">
        <PropertyHeader property={property} />
        <PropertyGallery property={property} />
        <PropertyOverview property={property} />
        <PropertyDescription property={property} />
        <PropertyDetails property={property} />
        <PropertyAddress property={property} />
        <PropertyFeatures property={property} />
      </div>
      <div className="flex-1">
        <div className="bg-gray-100 p-4 rounded-lg mb-4">
          <PropertyContact property={property} />
        </div>
      </div>
    </div>
  );
};
