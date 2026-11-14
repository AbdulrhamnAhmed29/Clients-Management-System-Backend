
import { z } from "zod";

const egyptianPhoneRegex = /^01[0125]\d{8}$/;
const objectIdPattern = /^[a-f\d]{24}$/i;

export const isValidTenantId = (id) => objectIdPattern.test(id);

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

export const updateTenantSchema = z
    .object({
        name: z
            .string()
            .trim()
            .min(3, "Name must be at least 3 characters")
            .max(30, "Name must not exceed 30 characters"),

        logo: z.union([
            z
                .string()
                .trim()
                .url("Logo must be a valid URL")
                .max(2048, "Logo URL is too long"),
            z.null(),
        ]).optional(),

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

        status: z.enum(["active", "suspended"]),
    })
    .partial()
    .strict()
    .refine((data) => Object.keys(data).length > 0, {
        message: "At least one field must be provided",
    });

export const listTenantsQuerySchema = z.object({
    cursor: z.string().regex(objectIdPattern, "cursor must be a valid tenant ID").optional(),
    limit: z.coerce.number().int().min(1).max(100).default(20),
});
