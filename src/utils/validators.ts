import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('E-mail inválido'),
  password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
});

export const registerWorkerSchema = z
  .object({
    name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
    email: z.string().email('E-mail inválido'),
    phone: z
      .string()
      .min(10, 'Telefone inválido')
      .max(15, 'Telefone inválido')
      .regex(/^\d+$/, 'Apenas números'),
    password: z.string().min(8, 'Senha deve ter no mínimo 8 caracteres'),
    confirmPassword: z.string(),
    jobOccupationIds: z.array(z.number()),
    operationCitiesIds: z.array(z.number()),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  });

export type LoginFormValues = z.infer<typeof loginSchema>;
export type RegisterWorkerFormValues = z.infer<typeof registerWorkerSchema>;
