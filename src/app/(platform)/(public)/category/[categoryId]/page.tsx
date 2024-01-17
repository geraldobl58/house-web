import Link from "next/link";

import prismadb from "@/lib/prismadb";

import Categories from "@/components/categories";
import { Button } from "@/components/ui/button";

import SearchInput from "./components/search-input";
import Properties from "./components/properties";
import Filters from "./components/filters";

interface CategoryPageProps {
  params: {
    categoryId: string;
  };
  searchParams: {
    categoryId: string;
    name: string;
    businessId: string;
  };
}

const CategoryPage = async ({ params, searchParams }: CategoryPageProps) => {
  const data = await prismadb.property.findMany({
    where: {
      categoryId: searchParams.categoryId,
      name: {
        search: searchParams.name,
      },
      businessId: searchParams.businessId,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      images: true,
      category: true,
      business: true,
    },
  });

  const categories = await prismadb.category.findMany();

  const business = await prismadb.business.findMany();

  const formattedProperties = data.map((item) => ({
    id: item.id,
    userId: item.userId,
    userName: item.userName,
    name: item.name,
    address: item.address,
    neighborhood: item.neighborhood,
    business: item.business.name,
    price: item.price,
    description: item.description,
    bathrooms: item.bedrooms,
    bedrooms: item.bedrooms,
    garage: item.garage,
    sqft: item.sqft,
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
          <Filters valueKey="businessId" data={business} name="Tipo" />
        </div>
        <div className="hidden lg:block">
          <Link href={`/category/${params.categoryId}`}>
            <Button className="w-full">Limpar Filtros</Button>
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
