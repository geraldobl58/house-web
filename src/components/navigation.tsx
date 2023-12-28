"use client";

import { usePathname, useRouter } from "next/navigation";

import { cn } from "@/lib/utils";

export const Navigation = () => {
  const pathname = usePathname();
  const router = useRouter();

  const onNavigate = (url: string) => {
    return router.push(url);
  };

  const routes = [
    {
      href: "/",
      label: "Home",
      pro: false,
    },
    {
      href: "/buy",
      label: "Comprar",
      pro: false,
    },
    {
      href: "/sale",
      label: "Vender",
      pro: false,
    },
    {
      href: "/rent",
      label: "Alugar",
      pro: false,
    },
    {
      href: "/help",
      label: "Festival",
      pro: false,
    },
    {
      href: "/featured",
      label: "Lançamentos",
      pro: false,
    },
    {
      href: "/explorer",
      label: "Explorar",
      pro: false,
    },
    {
      href: "/contact",
      label: "Contato",
      pro: false,
    },
    {
      href: "/anunciar",
      label: "Anunciar",
      pro: true,
      active: true,
    },
  ];

  return (
    <div className="space-y-4 flex text-primary bg-secondary">
      <div className="flex-1 justify-center">
        <div className="lg:flex items-center justify-center">
          {routes.map((route) => (
            <div
              key={route.href}
              onClick={() => onNavigate(route.href)}
              className={cn(
                `
                text-muted-foreground
                text-xs
                group
                flex
                p-3
                mr-6
                w-full
                justify-start
                font-medium
                cursor-pointer
                hover:text-primary
                hover:bg-primary/10
                rounded-lg
                transition
                mb-2
              `,
                pathname === route.href && "text-primary",
                route.active === true &&
                  `
                  bg-gradient-to-r 
                  from-sky-500 
                  via-blue-500 
                  to-cyan-500 
                  text-white border-0
                  hover:text-white
                  `
              )}
            >
              <div className="flex gap-y-2 items-center flex-1">
                <div className="text-base">{route.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
