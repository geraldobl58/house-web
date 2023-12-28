import Link from "next/link";
import Image from "next/image";

import { Navigation } from "@/components/navigation";
import { MobileNavigation } from "@/components/mobile-navigation";

const Navbar = async () => {
  return (
    <div
      className="
        fixed 
        w-full 
        z-50
        flex 
        justify-between
        items-center
        py-2
        px-4
        border-b
        border-primary/10
        bg-secondary
      "
    >
      <div className="flex items-center">
        <MobileNavigation />
        <Link href="/" passHref className="flex items-center justify-center">
          <Image alt="Logo" src="/logo.svg" width={30} height={30} />
          <h1 className="text-xl font-bold text-primary ml-2 uppercase">
            house.web
          </h1>
        </Link>
      </div>
      <div className="flex items-center gap-x-3">
        <div className="hidden lg:block mt-2">
          <Navigation />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
