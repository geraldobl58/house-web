"use client";

import { useState } from "react";

import { useParams, useRouter } from "next/navigation";

import { useForm } from "react-hook-form";

import InputMask from "react-input-mask";

import { zodResolver } from "@hookform/resolvers/zod";

import * as z from "zod";

import axios from "axios";

import toast from "react-hot-toast";

import { Trash } from "lucide-react";

import { Category, Image, Property } from "@prisma/client";

import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ImageUpload from "@/components/ui/image-upload";
import { Textarea } from "@/components/ui/textarea";
import { AlertModal } from "@/components/alert-modal";
import { Checkbox } from "@/components/ui/checkbox";
import ReactInputMask from "react-input-mask";

import { Business } from "@/types/business";

import { formShema } from "./schema";

interface ListingFormProps {
  initialData:
    | (Property & {
        images: Image[];
      })
    | null;
  categories: Category[];
  business: Business[];
}

type ListingFormValues = z.infer<typeof formShema>;

const ListingForm = ({
  initialData,
  categories,
  business,
}: ListingFormProps) => {
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? "Editar imóvel" : "Novo imóvel";
  const description = initialData
    ? "Edite imóvel existente."
    : "Adicione um novo imóvel.";
  const toastMessage = initialData
    ? "Imóvel atualizado com sucesso!"
    : "Imóvel cadastrado com sucesso!";
  const action = initialData ? "Editar registro" : "Salvar registro";

  const form = useForm<ListingFormValues>({
    resolver: zodResolver(formShema),
    defaultValues: initialData
      ? {
          ...initialData,
          price: parseInt(String(initialData?.price)),
        }
      : {
          name: "",
          categoryId: "",
          businessId: "",
          images: [],
          address: "",
          neighborhood: "",
          price: 0,
          description: "",
          bathrooms: 1,
          bedrooms: 1,
          garage: 1,
          sqft: 0,
          grill: false,
          pool: false,
        },
  });

  const onSubmit = async (data: ListingFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(`/api/listing/${params.listingId}`, data);
      } else {
        await axios.post(`/api/listing`, data);
      }
      router.refresh();
      toast.success(toastMessage);
      router.push("/listing");
      window.location.reload();
    } catch (error) {
      toast.error(toastMessage);
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/listing/${params.listingId}`);
      router.refresh();
      router.push("/listing");
      toast.success("Imóvel excluido com sucesso!");
    } catch (error) {
      toast.error("Houve um erro ao excluir o imóvel.");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="icon"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full mt-5"
        >
          <div className="grid grid-cols-2 gap-8">
            <FormField
              control={form.control}
              name="images"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Galeria</FormLabel>
                  <FormControl>
                    <ImageUpload
                      value={field.value.map((image) => image.url)}
                      disabled={loading}
                      onChange={(url) =>
                        field.onChange([...field.value, { url }])
                      }
                      onRemove={(url) =>
                        field.onChange([
                          ...field.value.filter(
                            (current) => current.url !== url
                          ),
                        ])
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Imóvel..."
                      {...field}
                      className="w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Endereço</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Digite o endereço..."
                      {...field}
                      className="w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="neighborhood"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bairro</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Digite o bairro..."
                      {...field}
                      className="w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="businessId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo</FormLabel>
                  <Select
                    disabled={loading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Selecionar"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {business.map((item) => (
                        <SelectItem key={item.id} value={item.id}>
                          {item.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categoria</FormLabel>
                  <Select
                    disabled={loading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Selecionar"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((item) => (
                        <SelectItem key={item.id} value={item.id}>
                          {item.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preço</FormLabel>
                  <FormControl>
                    {/* <InputMask
                      mask="999.999"
                      maskChar=""
                      {...field}
                      placeholder="R$"
                      className="w-full"
                    /> */}
                    <Input disabled={loading} {...field} className="w-full" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-4 gap-8">
            <FormField
              control={form.control}
              name="bathrooms"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Banheiros</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={1}
                      max={5}
                      disabled={loading}
                      placeholder="Banheiros"
                      {...field}
                      className="w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bedrooms"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quartos</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={1}
                      max={5}
                      disabled={loading}
                      placeholder="Quartos"
                      {...field}
                      className="w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="garage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Garagem</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={1}
                      max={5}
                      disabled={loading}
                      placeholder="Garagem"
                      {...field}
                      className="w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="sqft"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Terreno</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={loading}
                      placeholder="Terreno"
                      {...field}
                      className="w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-1 gap-8">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Textarea
                      disabled={loading}
                      placeholder="Descrição completa..."
                      {...field}
                      className="w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-8 gap-8">
            <FormField
              control={form.control}
              name="grill"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Churrasqueira</FormLabel>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="pool"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Piscina</FormLabel>
                  </div>
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" disabled={loading} className="ml-auto">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default ListingForm;
