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

  const business = await prismadb.business.findMany({
    orderBy: {
      name: "asc",
    },
  });
  business;

  return (
    <ListingForm
      initialData={properties}
      categories={categories}
      business={business}
    />
  );
};

export default PropertyIdPage;
