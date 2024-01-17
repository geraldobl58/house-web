import { z } from "zod";

export const formShema = z.object({
  name: z.string().min(10),
  images: z.object({ url: z.string() }).array().min(1),
  categoryId: z.string().min(1),
  businessId: z.string().min(1, {
    message: "Campo obrigátorio!",
  }),
  address: z.string().min(5),
  neighborhood: z.string().min(10),
  price: z.coerce.number(),
  description: z.string().min(10).max(300),
  bathrooms: z.coerce.number().min(1),
  bedrooms: z.coerce.number().min(1),
  garage: z.coerce.number().min(1),
  sqft: z.coerce.number().optional(),
  grill: z.boolean().default(false).optional(),
  pool: z.boolean().default(false).optional(),
});
