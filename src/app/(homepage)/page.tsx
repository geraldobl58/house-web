import { Search } from "./components/search";

import CardItem from "@/components/card-item";

const HomePage = () => {
  return (
    <div className="h-full">
      <Search />
      <div className="mx-auto w-full max-w-[1600px] gap-5 p-8">
        <div>
          <CardItem />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
