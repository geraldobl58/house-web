import Link from "next/link";

import Categories from "@/components/categories";

import { Button } from "@/components/ui/button";

import SearchInput from "./components/search-input";
import Properties from "./components/properties";
import Filters from "./components/filters";

import prismadb from "@/lib/prismadb";

interface CategoryPageProps {
  params: {
    categoryId: string;
  };
  searchParams: {
    categoryId: string;
    bathroomId: string;
    bedroomId: string;
    garageId: string;
    businessId: string;
    name: string;
  };
}

const CategoryPage = async ({ searchParams, params }: CategoryPageProps) => {
  const data = await prismadb.property.findMany({
    where: {
      categoryId: searchParams.categoryId,
      bathroomId: searchParams.bathroomId,
      bedroomId: searchParams.bedroomId,
      garageId: searchParams.garageId,
      businessId: searchParams.businessId,
      name: {
        search: searchParams.name,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      images: true,
      bathroom: true,
      bedroom: true,
      category: true,
      garage: true,
    },
  });

  const bathroom = await prismadb.bathroom.findMany({
    orderBy: {
      quantity: "asc",
    },
  });

  const bedroom = await prismadb.bedroom.findMany({
    orderBy: {
      quantity: "asc",
    },
  });

  const garage = await prismadb.garage.findMany({
    orderBy: {
      quantity: "asc",
    },
  });

  const business = await prismadb.business.findMany({
    orderBy: {
      name: "asc",
    },
  });

  const categories = await prismadb.category.findMany();

  const formattedProperties = data.map((item) => ({
    id: item.id,
    userId: item.userId,
    userName: item.userName,
    name: item.name,
    address: item.address,
    neighborhood: item.neighborhood,
    price: item.price,
    description: item.description,
    bathroom: item.bathroom.quantity,
    bedroom: item.bedroom.quantity,
    garage: item.garage.quantity,
    category: item.category,
    images: item.images.map((image) => image.url),
  }));

  return (
    <div className="flex gap-4">
      <div className="bg-zinc-100 w-[500px] p-6 rounded-lg">
        <h3 className="text-lg">Busque seu imóvel</h3>
        <div className="relative mt-4">
          <SearchInput />
        </div>
        <div>
          <Filters valueKey="businessId" name="Tipo" business={business} />
        </div>
        <div>
          <Filters valueKey="bedroomId" name="Quartos" bedroom={bedroom} />
        </div>
        <div>
          <Filters valueKey="bathroomId" name="Banheiros" bathroom={bathroom} />
        </div>
        <div>
          <Filters valueKey="garageId" name="Garagem" garage={garage} />
        </div>
        <div>
          <Link href={`/category/${params.categoryId}`} passHref>
            <Button className="w-full">Limpar</Button>
          </Link>
        </div>
      </div>
      <div className="flex-1 bg-zinc-100 h-full p-6 rounded-lg">
        <Categories data={categories} />
        <Properties data={formattedProperties} />
      </div>
    </div>
  );
};

export default CategoryPage;
