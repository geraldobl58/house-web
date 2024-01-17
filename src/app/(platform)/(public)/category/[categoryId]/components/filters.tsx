"use client";

import { useRouter, useSearchParams } from "next/navigation";

import qs from "query-string";

import { Business } from "@prisma/client";

import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";

interface FilterProps {
  name: string;
  valueKey: string;
  data?: Business[];
}

const Filters = ({ name, valueKey, data }: FilterProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const selectedValue = searchParams.get(valueKey);

  const onClick = (id: string) => {
    const current = qs.parse(searchParams.toString());

    const query = {
      ...current,
      [valueKey]: id,
    };

    if (current[valueKey] === id) {
      query[valueKey] = null;
    }

    const url = qs.stringifyUrl(
      {
        url: window.location.href,
        query,
      },
      {
        skipNull: true,
      }
    );

    router.push(url);
  };

  return (
    <div className="mb-8">
      <h3 className="text-lg mt-4">{name}</h3>
      <hr className="my-4" />
      <div className="flex flex-wrap gap-2">
        {data?.map((item) => (
          <div key={item.id} className="flex items-center">
            <Button
              className={cn(
                `
                rounded-md
                text-sm
                text-gray-800
                w-[220px]
                bg-white
                border
                border-gray-300
                hover:text-white
              `,
                selectedValue === item.id && "bg-primary text-white"
              )}
              onClick={() => onClick(item.id)}
            >
              {item.name}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Filters;
