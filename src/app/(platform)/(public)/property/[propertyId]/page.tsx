import { redirect } from "next/navigation";

import prismadb from "@/lib/prismadb";

import { PropertyClient } from "./components/property-client";

interface PropertiesPageProps {
  params: {
    propertyId: string;
  };
}

const PropertiesIdPage = async ({ params }: PropertiesPageProps) => {
  const property = await prismadb.property.findUnique({
    where: {
      id: params.propertyId,
    },
    include: {
      category: true,
      business: true,
      images: true,
    },
  });

  if (!property) {
    return redirect("/");
  }

  return <PropertyClient property={property} />;
};

export default PropertiesIdPage;
