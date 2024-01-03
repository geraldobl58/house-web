import Navbar from "@/components/navbar";

import prismadb from "@/lib/prismadb";

import { PropertyClient } from "./components/client";

const PropertiesPage = async () => {
  const properties = await prismadb.property.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      bathroom: true,
      category: true,
      bedroom: true,
      garage: true,
    },
  });

  const formattedProperties = properties.map((item) => ({
    id: item.id,
    name: item.name,
  }));

  return (
    <div className="flex-col">
      <PropertyClient data={formattedProperties} />
    </div>
  );
};

export default PropertiesPage;
