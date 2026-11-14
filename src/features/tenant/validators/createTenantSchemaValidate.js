
import { z } from "zod";

const egyptianPhoneRegex = /^01[0125]\d{8}$/;

const logoSchema = z.preprocess(
    (value) => {
        if (typeof value === "string" && value.trim() === "") {
            return undefined;
        }

        return value;
    },
    z
        .string()
        .trim()
        .url("Logo must be a valid URL")
        .max(2048, "Logo URL is too long")
        .optional()
);

export const createTenantSchema = z
    .object({
        name: z
            .string()
            .trim()
            .min(3, "Name must be at least 3 characters")
            .max(30, "Name must not exceed 30 characters"),

        logo: logoSchema,

        address: z
            .string()
            .trim()
            .min(5, "Address must be at least 5 characters")
            .max(200, "Address must not exceed 200 characters"),

        phone: z
            .string()
            .trim()
            .regex(
                egyptianPhoneRegex,
                "Enter a valid Egyptian mobile number"
            ),
    })
    .strict();
