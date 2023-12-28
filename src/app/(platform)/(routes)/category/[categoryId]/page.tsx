import { Search } from "lucide-react";

import Navbar from "@/components/navbar";
import { Input } from "@/components/ui/input";

const CategoryPage = () => {
  return (
    <>
      <Navbar />

      <div className="mx-auto w-full max-w-[1600px] gap-5 p-8">
        <div className="flex items-center justify-center gap-4">
          <div
            className="

              bg-zinc-100
              w-[500px] 
              p-6
              rounded-lg
            "
          >
            <h3 className="text-lg">Busque seu imóvel</h3>
            <div className="relative mt-4">
              <Search className="absolute h-4 w-4 top-3 left-4 text-muted-foreground" />
              <Input placeholder="Pesquisar..." className="pl-10" />
            </div>
          </div>
          <div
            className="flex-1 bg-zinc-100
              h-full 
              w-[500px] 
              p-6
              rounded-lg"
          >
            Content Data
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryPage;
