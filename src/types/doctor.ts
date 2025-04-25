export interface Doctor {
  id: string;
  name: string;
  specialties?: string[];
  experience?: number;
  fee?: number;
  consultationModes?: ('Video Consult' | 'In Clinic')[];
  location?: string;
  clinicName?: string;
  image?: string;
}

export type ConsultationType = 'Video Consult' | 'In Clinic';

export type SortType = 'fees' | 'experience';

export interface Filters {
  consultationType?: ConsultationType;
  specialties: string[];
  sortBy?: SortType;
  searchQuery: string;
} 