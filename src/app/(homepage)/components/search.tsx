"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const Search = () => {
  return (
    <div
      className="
        flex
        flex-col
        items-center
        justify-center
        w-full
        h-[500px]
        bg-[url('http://localhost:3000/banner.jpeg')]
        bg-center
      "
    >
      <h1
        className="
          font-light 
          text-5xl
          text-white 
          bg-gradient-to-r 
          from-sky-500 
          to-indigo-500
          p-4
          rounded-md
        "
      >
        Encontre seu sonho na vida real.
      </h1>
      <h3
        className="
          font-light 
          text-3xl
          text-white
          bg-gradient-to-r 
          from-violet-500 
          to-fuchsia-500
          p-2
          mt-2
          rounded-md
        "
      >
        Você muda, sua vida muda.
      </h3>
      <div
        className="
          flex 
          items-center
          justify-center
          w-[1000px] 
          mt-10
          p-4
          bg-white
          rounded-md
        "
      >
        <div className="mr-6">
          <Select>
            <SelectTrigger className="border border-primary w-[300px] p-6">
              <SelectValue placeholder="Tipo de imóvel" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Selecione o tipo</SelectLabel>
                <SelectItem value="apartamento">Apartamento</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="mr-6">
          <Input
            placeholder="Onde deseja morar?"
            className="border border-primary w-[480px] p-6"
          />
        </div>
        <div>
          <Button className="p-6">Buscar</Button>
        </div>
      </div>
    </div>
  );
};
