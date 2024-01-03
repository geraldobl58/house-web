import Navbar from "@/components/navbar";
import Categories from "@/components/categories";

import SearchInput from "./components/search-input";

import prismadb from "@/lib/prismadb";

const CategoryPage = async () => {
  const categories = await prismadb.category.findMany();

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
      </div>
    </div>
  );
};

export default CategoryPage;
