import prismadb from "@/lib/prismadb";

import ListingForm from "./components/listing-form";

interface ListingIdPageProps {
  params: {
    listingId: string;
  };
}

const PropertyIdPage = async ({ params }: ListingIdPageProps) => {
  // TODO: Check subscription

  const properties = await prismadb.property.findUnique({
    where: {
      id: params.listingId,
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

  const business = await prismadb.business.findMany({
    orderBy: {
      name: "asc",
    },
  });

  return (
    <ListingForm
      initialData={properties}
      categories={categories}
      business={business}
      bathrooms={bathrooms}
      bedrooms={bedrooms}
      garages={garages}
    />
  );
};

export default PropertyIdPage;
