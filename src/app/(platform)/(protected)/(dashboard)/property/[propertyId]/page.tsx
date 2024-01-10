import prismadb from "@/lib/prismadb";
import PropertyForm from "./components/property-form";

interface PropertyIdPageProps {
  params: {
    propertyId: string;
  };
}

const PropertyIdPage = async ({ params }: PropertyIdPageProps) => {
  // TODO: Check subscription

  const properties = await prismadb.property.findUnique({
    where: {
      id: params.propertyId,
    },
    include: {
      images: true,
    },
  });

  const categories = await prismadb.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  const bathrooms = await prismadb.bathroom.findMany({
    orderBy: {
      quantity: "asc",
    },
  });

  const bedrooms = await prismadb.bedroom.findMany({
    orderBy: {
      quantity: "asc",
    },
  });

  const garages = await prismadb.garage.findMany({
    orderBy: {
      quantity: "asc",
    },
  });

  return (
    <PropertyForm
      initialData={properties}
      categories={categories}
      bathrooms={bathrooms}
      bedrooms={bedrooms}
      garages={garages}
    />
  );
};

export default PropertyIdPage;
