"use client";

import { useRouter, useSearchParams } from "next/navigation";

import qs from "query-string";

import { Button } from "@/components/ui/button";

import { Bathroom } from "@/types/bathroom";
import { Bedroom } from "@/types/bedroom";
import { Business } from "@/types/business";

import { cn } from "@/lib/utils";

interface FilterProps {
  business?: Business[];
  bathroom?: Bathroom[];
  bedroom?: Bedroom[];
  name: string;
  valueKey: string;
}

const garage = [
  {
    id: "1",
    quantity: 1,
  },
];

const Filters = ({
  business,
  bathroom,
  bedroom,
  name,
  valueKey,
}: FilterProps) => {
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
        {business?.map((item) => (
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
      <div className="flex flex-wrap gap-2">
        {bathroom?.map((item) => (
          <div key={item.id} className="flex items-center">
            <Button
              className={cn(
                `
                rounded-md
                text-sm
                text-gray-800
                w-8
                bg-white
                border
                border-gray-300
                hover:text-white
              `,
                selectedValue === item.id && "bg-primary text-white"
              )}
              onClick={() => onClick(item.id)}
            >
              {item.quantity}
            </Button>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {bedroom?.map((item) => (
          <div key={item.id} className="flex items-center">
            <Button
              className={cn(
                `
                rounded-md
                text-sm
                text-gray-800
                w-8
                bg-white
                border
                border-gray-300
                hover:text-white
              `,
                selectedValue === item.id && "bg-primary text-white"
              )}
              onClick={() => onClick(item.id)}
            >
              {item.quantity}
            </Button>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {garage?.map((item) => (
          <div key={item.id} className="flex items-center">
            <Button
              className={cn(
                `
                rounded-md
                text-sm
                text-gray-800
                w-8
                bg-white
                border
                border-gray-300
                hover:text-white
              `,
                selectedValue === item.id && "bg-primary text-white"
              )}
              onClick={() => onClick(item.id)}
            >
              {item.quantity}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Filters;
