import { Doctor, Filters } from '../types/doctor';

interface FilterPanelProps {
  filters: Filters;
  onFilterChange: (filters: Filters) => void;
  doctors: Doctor[];
}

export default function FilterPanel({ filters, onFilterChange, doctors }: FilterPanelProps) {
  const allSpecialties = Array.from(
    new Set(doctors.flatMap(doctor => doctor.specialties))
  ).sort();

  const handleSpecialtyChange = (specialty: string) => {
    const newSpecialties = filters.specialties.includes(specialty)
      ? filters.specialties.filter(s => s !== specialty)
      : [...filters.specialties, specialty];
    
    onFilterChange({
      ...filters,
      specialties: newSpecialties
    });
  };

  const handleConsultationTypeChange = (type: string) => {
    onFilterChange({
      ...filters,
      consultationType: filters.consultationType === type ? undefined : type
    });
  };

  const handleSortChange = (sortBy: string) => {
    onFilterChange({
      ...filters,
      sortBy: filters.sortBy === sortBy ? undefined : sortBy
    });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">Filters</h2>
      
      <div className="mb-6">
        <h3 className="text-sm font-medium mb-2">Specialties</h3>
        <div className="space-y-2">
          {allSpecialties.map(specialty => (
            <label key={specialty} className="flex items-center">
              <input
                type="checkbox"
                checked={filters.specialties.includes(specialty)}
                onChange={() => handleSpecialtyChange(specialty)}
                className="mr-2"
              />
              {specialty}
            </label>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-sm font-medium mb-2">Consultation Type</h3>
        <div className="space-y-2">
          {['Video Consult', 'In Clinic'].map(type => (
            <label key={type} className="flex items-center">
              <input
                type="radio"
                name="consultationType"
                checked={filters.consultationType === type}
                onChange={() => handleConsultationTypeChange(type)}
                className="mr-2"
              />
              {type}
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Sort By</h3>
        <div className="space-y-2">
          {['fees', 'experience'].map(sort => (
            <label key={sort} className="flex items-center">
              <input
                type="radio"
                name="sortBy"
                checked={filters.sortBy === sort}
                onChange={() => handleSortChange(sort)}
                className="mr-2"
              />
              {sort.charAt(0).toUpperCase() + sort.slice(1)}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
} 