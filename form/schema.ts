import { z } from "zod";

export const formSchema = z.object({
    workLocationLat: z.string().min(3, {
        message: "Veuillez sélectionner une localisation"
    }).max(20),
    workLocationLng: z.string().min(3, {
        message: "Veuillez sélectionner une localisation"
    }).max(20),
    transportationMean: z.string().min(3, {
        message: "Veuillez entrer votre moyen de déplacement"
    }).max(20),

});

export type FormSchemaType = z.infer<typeof formSchema>;