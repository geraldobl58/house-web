import { Image, Property } from "@prisma/client";

import ImageGallery from "react-image-gallery";

import "react-image-gallery/styles/css/image-gallery.css";

interface PropertyGalleryProps {
  property: Property & {
    images: Image[];
  };
}

export const PropertyGallery = ({ property }: PropertyGalleryProps) => {
  const formattedImages = property.images.map((item) => ({
    original: item.url,
    thumbnail: item.url,
  }));

  return (
    <div className="bg-gray-100 p-4 rounded-lg mb-4 space-y-4">
      <h3 className="text-muted-foreground">Galeria</h3>
      <div className="grid grid-cols-1 gap-2">
        <ImageGallery items={formattedImages} />
      </div>
    </div>
  );
};
