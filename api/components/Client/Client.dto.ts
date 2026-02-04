import { z } from 'zod';
import { ClientSchema } from './Client.validation.schema';

export type CreateClientDto = z.infer<typeof ClientSchema>;
export type UpdateClientDto = Partial<CreateClientDto>;
