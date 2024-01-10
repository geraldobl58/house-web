import prismadb from "@/lib/prismadb";

import { auth, redirectToSignIn } from "@clerk/nextjs";

import { PropertyClient } from "./components/client";

const PropertiesPage = async () => {
  // Verifica se o usuário é o mesmo que tem permissão para ver seus anúncios.
  const { userId } = auth();

  if (!userId) {
    return redirectToSignIn();
  }

  const properties = await prismadb.property.findMany({
    where: {
      userId,
    },
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
