import Navbar from "@/components/navbar";

import SearchInput from "./components/search-input";

const CategoryPage = () => {
  return (
    <>
      <Navbar />

      <div className="mx-auto w-full max-w-[1600px] gap-5 p-8">
        <div className="flex gap-4">
          <div className="bg-zinc-100 w-[500px] p-6 rounded-lg">
            <h3 className="text-lg">Busque seu imóvel</h3>
            <div className="relative mt-4">
              <SearchInput />
            </div>
          </div>
          <div className="flex-1 bg-zinc-100 h-full p-6 rounded-lg">
            Content Data
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryPage;
