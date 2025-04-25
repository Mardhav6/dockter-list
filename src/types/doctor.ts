export interface Doctor {
  id: string;
  name: string;
  name_initials: string;
  photo: string;
  introduction: string;
  specialties: string[];
  experience: number;
  fee: number;
  clinicName: string;
  location: string;
  languages: string[];
  consultationModes: string[];
}

export interface Filters {
  specialties: string[];
  searchQuery: string;
  consultationType?: string;
  sortBy?: string;
} 