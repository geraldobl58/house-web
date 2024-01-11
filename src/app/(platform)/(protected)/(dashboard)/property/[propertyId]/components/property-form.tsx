"use client";

import { useState } from "react";

import { useParams, useRouter } from "next/navigation";

import { useForm } from "react-hook-form";

import * as z from "zod";

import { zodResolver } from "@hookform/resolvers/zod";

import axios from "axios";

import toast from "react-hot-toast";

import { Trash } from "lucide-react";

import {
  Bathroom,
  Bedroom,
  Category,
  Garage,
  Image,
  Property,
} from "@prisma/client";
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

interface PropertiesFormProps {
  initialData:
    | (Property & {
        images: Image[];
      })
    | null;
  categories: Category[];
  bathrooms: Bathroom[];
  bedrooms: Bedroom[];
  garages: Garage[];
}

export const formShema = z.object({
  name: z.string().min(10),
  images: z.object({ url: z.string() }).array().min(1),
  categoryId: z.string().min(1),
  address: z.string().min(5),
  neighborhood: z.string().min(10),
  price: z.coerce.number(),
  description: z.string().min(10),
  bathroomId: z.string().min(1),
  bedroomId: z.string().min(1),
  garageId: z.string().min(1),
});

type PropertiesFormValues = z.infer<typeof formShema>;

const PropertyForm = ({
  initialData,
  categories,
  bathrooms,
  bedrooms,
  garages,
}: PropertiesFormProps) => {
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

  const form = useForm<PropertiesFormValues>({
    resolver: zodResolver(formShema),
    defaultValues: initialData
      ? {
          ...initialData,
          price: parseFloat(String(initialData?.price)),
        }
      : {
          name: "",
          categoryId: "",
          images: [],
          address: "",
          neighborhood: "",
          price: 0,
          description: "",
          bathroomId: "",
          bedroomId: "",
          garageId: "",
        },
  });

  const onSubmit = async (data: PropertiesFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(`/api/properties/${params.propertyId}`, data);
      } else {
        await axios.post(`/api/properties`, data);
      }
      router.refresh();
      toast.success(toastMessage);
      router.push("/property");
    } catch (error) {
      toast.error(toastMessage);
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/property/${params.propertyId}`);
      router.refresh();
      router.push("/");
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
              name="bathroomId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Banheiros</FormLabel>
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
                      {bathrooms.map((item) => (
                        <SelectItem key={item.id} value={item.id}>
                          {item.quantity}
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
              name="bedroomId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quartos</FormLabel>
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
                      {bedrooms.map((item) => (
                        <SelectItem key={item.id} value={item.id}>
                          {item.quantity}
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
              name="garageId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Garagem</FormLabel>
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
                      {garages.map((item) => (
                        <SelectItem key={item.id} value={item.id}>
                          {item.quantity}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
          <Button type="submit" disabled={loading} className="ml-auto">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default PropertyForm;
