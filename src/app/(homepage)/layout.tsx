import Navbar from "@/components/navbar";
import { Search } from "./components/search";

const HomepageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="h-full">
        <Navbar />
        <main className="pt-20 h-full">
          <Search />
          {children}
        </main>
      </div>
    </>
  );
};

export default HomepageLayout;
