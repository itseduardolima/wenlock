import { z } from "zod"

const userBaseSchema = z.object({
  name: z
    .string()
    .min(1, "Nome é obrigatório")
    .max(30, "Nome deve ter no máximo 30 caracteres")
    .regex(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/, "Nome deve conter apenas letras"),
  email: z
    .string()
    .min(1, "E-mail é obrigatório")
    .max(40, "E-mail deve ter no máximo 40 caracteres")
    .email("E-mail inválido"),
  matricula: z.string().min(1, "Matrícula é obrigatória").regex(/^\d+$/, "Matrícula deve conter apenas números"),
  password: z
    .string()
    .min(6, "Senha deve ter pelo menos 6 caracteres")
    .regex(/^[a-zA-Z0-9]+$/, "Senha deve ser alfanumérica"),
  confirmPassword: z.string().min(1, "Confirmação de senha é obrigatória"),
})

export const userFormSchema = userBaseSchema.refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não coincidem",
  path: ["confirmPassword"],
})

export const createUserSchema = userBaseSchema.omit({ confirmPassword: true })
export const updateUserSchema = createUserSchema.partial()
export type UserFormData = z.infer<typeof userFormSchema>
export type CreateUserData = z.infer<typeof createUserSchema>
export type UpdateUserData = z.infer<typeof updateUserSchema>