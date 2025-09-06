import { type UUID } from '.';

export interface User {
  id: UUID;
  email: string;
  created_at: string;
  updated_at: string;
}
