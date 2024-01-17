import Categories from "@/components/categories";

import SearchInput from "./components/search-input";
import Properties from "./components/properties";

import prismadb from "@/lib/prismadb";

interface CategoryPageProps {
  searchParams: {
    categoryId: string;
    name: string;
  };
}

const CategoryPage = async ({ searchParams }: CategoryPageProps) => {
  const data = await prismadb.property.findMany({
    where: {
      categoryId: searchParams.categoryId,
      name: {
        search: searchParams.name,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      images: true,
      category: true,
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
      </div>
      <div className="flex-1 bg-zinc-100 h-full p-6 rounded-lg">
        <Categories data={categories} />
        <Properties data={formattedProperties} />
      </div>
    </div>
  );
};

export default CategoryPage;
