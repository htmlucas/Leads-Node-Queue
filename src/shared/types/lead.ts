export interface Lead {
  id: number;
  name: string | null;
  email: string;
  phone: string | null;
  consent: boolean | null;
}