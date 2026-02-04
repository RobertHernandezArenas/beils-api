import { z } from 'zod';
import { ClientSchema } from './Client.schema';

export type CreateClientDto = z.infer<typeof ClientSchema>;
export type UpdateClientDto = Partial<CreateClientDto>;
