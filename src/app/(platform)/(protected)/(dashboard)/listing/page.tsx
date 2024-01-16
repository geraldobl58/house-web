import prismadb from "@/lib/prismadb";

import { auth, redirectToSignIn } from "@clerk/nextjs";

import formatPrice from "@/lib/utils";

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
      category: true,
      business: true,
    },
  });

  const formattedProperties = listings.map((item) => ({
    id: item.id,
    name: item.name,
    address: item.address,
    price: formatPrice(item.price),
    neighborhood: item.neighborhood,
    bathroom: item.bathrooms,
    bedroom: item.bedrooms,
    garage: item.garage,
    category: item.category.name,
    userName: item.userName,
  }));

  return (
    <div className="flex-col">
      <ListingClient data={formattedProperties} />
    </div>
  );
};

export default DashboardPage;
