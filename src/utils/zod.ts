import { z } from "zod";

export interface ILoginForm {
    email: string;
    password: string;
}

export interface IRegisterForm {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export const loginValidator = z.object({
    email: z
        .string()
        .min(1, { message: 'Email tidak boleh kosong.' }),
    password: z
        .string()
        .min(8, { message: 'Password harus 8 karakter atau lebih.' })
});

export const registerValidator = z
    .object({
        name: z.string().min(1, { message: 'Nama tidak boleh kosong.' }),
        email: z.string().min(1, { message: 'Email tidak boleh kosong.' }),
        password: z.string().min(8, {
            message: 'Password harus 8 karakter atau lebih.',
        }),
        confirmPassword: z.string().min(1, {
            message: 'Konfirmasi password tidak boleh kosong.',
        }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        path: ['confirmPassword'],
        message: 'Password tidak cocok',
    });
