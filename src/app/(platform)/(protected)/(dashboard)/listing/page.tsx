import prismadb from "@/lib/prismadb";

import { auth, redirectToSignIn } from "@clerk/nextjs";

import { ListingClient } from "./components/client";

const DashboardPage = async () => {
  // Verifica se o usuário é o mesmo que tem permissão para ver seus anúncios.
  const { userId } = auth();

  if (!userId) {
    return redirectToSignIn();
  }

  const listings = await prismadb.property.findMany({
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

  const formattedProperties = listings.map((item) => ({
    id: item.id,
    name: item.name,
  }));

  return (
    <div className="flex-col">
      <ListingClient data={formattedProperties} />
    </div>
  );
};

export default DashboardPage;
