import { z } from "zod";

export const formSchema = z.object({
    workLocationLat: z.string().min(3).max(20),
    workLocationLng: z.string().min(3).max(20),

});

export type FormShemaType = z.infer<typeof formSchema>;