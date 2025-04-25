'use client';

import { useEffect, useState, useCallback, Suspense } from 'react';
import { Doctor, Filters } from '@/types/doctor';
import DoctorList from '@/components/DoctorList';
import SearchBar from '@/components/SearchBar';
import FilterPanel from '@/components/FilterPanel';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';

function HomeContent() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);
  const [filters, setFilters] = useState<Filters>({
    specialties: [],
    searchQuery: '',
    consultationType: undefined,
    sortBy: undefined
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetch('/data/doc.json');
        if (!response.ok) {
          throw new Error('Failed to fetch doctors');
        }
        const data = await response.json();
        const doctorsData = data.map((doctor: any) => ({
          id: doctor.id,
          name: doctor.name,
          name_initials: doctor.name.split(' ').map((n: string) => n[0]).join(''),
          photo: doctor.photo || '/images/placeholder-doctor.jpg',
          introduction: doctor.doctor_introduction,
          specialties: doctor.specialities.map((s: any) => s.name),
          experience: parseInt(doctor.experience),
          fee: parseInt(doctor.fees.replace(/[^0-9]/g, '')),
          clinicName: doctor.clinic.name,
          location: doctor.clinic.address.city,
          languages: doctor.languages,
          consultationModes: [
            ...(doctor.video_consult ? ['Video Consult'] : []),
            ...(doctor.in_clinic ? ['In Clinic'] : [])
          ]
        }));
        setDoctors(doctorsData);
        setFilteredDoctors(doctorsData);
      } catch (error) {
        console.error('Error fetching doctors:', error);
        setError('Failed to load doctors. Please try again later.');
        setDoctors([]);
        setFilteredDoctors([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  const applyFilters = useCallback(() => {
    let filtered = [...doctors];

    if (filters.searchQuery) {
      filtered = filtered.filter(doctor =>
        doctor.name.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
        doctor.specialties.some(specialty =>
          specialty.toLowerCase().includes(filters.searchQuery.toLowerCase())
        )
      );
    }

    if (filters.consultationType) {
      filtered = filtered.filter(doctor =>
        doctor.consultationModes.includes(filters.consultationType!)
      );
    }

    if (filters.specialties.length > 0) {
      filtered = filtered.filter(doctor =>
        doctor.specialties.some(specialty => filters.specialties.includes(specialty))
      );
    }

    if (filters.sortBy) {
      filtered.sort((a, b) => {
        if (filters.sortBy === 'fees') {
          return (a.fee || 0) - (b.fee || 0);
        } else {
          return (b.experience || 0) - (a.experience || 0);
        }
      });
    }

    setFilteredDoctors(filtered);
  }, [doctors, filters]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams?.toString() || '');
    
    if (filters.consultationType) {
      params.set('consultationType', filters.consultationType);
    } else {
      params.delete('consultationType');
    }

    if (filters.specialties.length) {
      params.set('specialties', filters.specialties.join(','));
    } else {
      params.delete('specialties');
    }

    if (filters.sortBy) {
      params.set('sortBy', filters.sortBy);
    } else {
      params.delete('sortBy');
    }

    if (filters.searchQuery) {
      params.set('search', filters.searchQuery);
    } else {
      params.delete('search');
    }

    const queryString = params.toString();
    const newUrl = queryString ? `${pathname || '/'}?${queryString}` : (pathname || '/');
    router.push(newUrl, { scroll: false });
    
    applyFilters();
  }, [filters, pathname, router, searchParams, applyFilters]);

  useEffect(() => {
    const consultationType = searchParams?.get('consultationType');
    const specialties = searchParams?.get('specialties')?.split(',').filter(Boolean) || [];
    const sortBy = searchParams?.get('sortBy');
    const search = searchParams?.get('search') || '';

    setFilters(prev => ({
      ...prev,
      consultationType: consultationType as any || undefined,
      specialties,
      sortBy: sortBy as any || undefined,
      searchQuery: search,
    }));
  }, [searchParams]);

  return (
    <main className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Find Your Doctor</h1>
        <SearchBar
          searchQuery={filters.searchQuery}
          onSearch={(query) => setFilters(prev => ({ ...prev, searchQuery: query }))}
          doctors={doctors}
        />
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
          <FilterPanel
            filters={filters}
            onFilterChange={setFilters}
            doctors={doctors}
          />
          <div className="md:col-span-3">
            {isLoading ? (
              <div className="text-center py-8">
                <p className="text-gray-600">Loading doctors...</p>
              </div>
            ) : error ? (
              <div className="text-center py-8">
                <p className="text-red-600">{error}</p>
              </div>
            ) : (
              <>
                <div className="mb-4">
                  <p className="text-gray-600">
                    Showing {filteredDoctors.length} of {doctors.length} doctors
                  </p>
                </div>
                <DoctorList doctors={filteredDoctors} />
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    </div>}>
      <HomeContent />
    </Suspense>
  );
} 