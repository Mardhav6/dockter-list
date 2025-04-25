import { Doctor, Filters, ConsultationType, SortType } from '../types/doctor';

interface FilterPanelProps {
  filters: Filters;
  onFilterChange: (filters: Filters) => void;
  doctors: Doctor[];
}

const SPECIALTIES = [
  'General Physician', 'Dentist', 'Dermatologist', 'Paediatrician',
  'Gynaecologist', 'ENT', 'Diabetologist', 'Cardiologist',
  'Physiotherapist', 'Endocrinologist', 'Orthopaedic', 'Ophthalmologist',
  'Gastroenterologist', 'Pulmonologist', 'Psychiatrist', 'Urologist',
  'Dietitian/Nutritionist', 'Psychologist', 'Sexologist', 'Nephrologist',
  'Neurologist', 'Oncologist', 'Ayurveda', 'Homeopath'
];

export default function FilterPanel({ filters, onFilterChange, doctors }: FilterPanelProps) {
  const handleConsultationTypeChange = (type: ConsultationType) => {
    onFilterChange({
      ...filters,
      consultationType: filters.consultationType === type ? undefined : type,
    });
  };

  const handleSpecialtyChange = (specialty: string) => {
    const newSpecialties = filters.specialties.includes(specialty)
      ? filters.specialties.filter(s => s !== specialty)
      : [...filters.specialties, specialty];
    onFilterChange({ ...filters, specialties: newSpecialties });
  };

  const handleSortChange = (sortType: SortType) => {
    onFilterChange({ ...filters, sortBy: sortType });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      {/* Consultation Mode Filter */}
      <div className="mb-6">
        <h3 data-testid="filter-header-moc" className="font-semibold mb-3">
          Consultation Mode
        </h3>
        <div className="space-y-2">
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              data-testid="filter-video-consult"
              checked={filters.consultationType === 'Video Consult'}
              onChange={() => handleConsultationTypeChange('Video Consult')}
              className="form-radio"
            />
            <span>Video Consult</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              data-testid="filter-in-clinic"
              checked={filters.consultationType === 'In Clinic'}
              onChange={() => handleConsultationTypeChange('In Clinic')}
              className="form-radio"
            />
            <span>In Clinic</span>
          </label>
        </div>
      </div>

      {/* Specialties Filter */}
      <div className="mb-6">
        <h3 data-testid="filter-header-speciality" className="font-semibold mb-3">
          Specialties
        </h3>
        <div className="space-y-2 max-h-60 overflow-y-auto">
          {SPECIALTIES.map((specialty) => (
            <label key={specialty} className="flex items-center space-x-2">
              <input
                type="checkbox"
                data-testid={`filter-specialty-${specialty.replace('/', '-')}`}
                checked={filters.specialties.includes(specialty)}
                onChange={() => handleSpecialtyChange(specialty)}
                className="form-checkbox"
              />
              <span>{specialty}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Sort Filter */}
      <div>
        <h3 data-testid="filter-header-sort" className="font-semibold mb-3">
          Sort By
        </h3>
        <div className="space-y-2">
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              data-testid="sort-fees"
              checked={filters.sortBy === 'fees'}
              onChange={() => handleSortChange('fees')}
              className="form-radio"
            />
            <span>Fees (Low to High)</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              data-testid="sort-experience"
              checked={filters.sortBy === 'experience'}
              onChange={() => handleSortChange('experience')}
              className="form-radio"
            />
            <span>Experience (High to Low)</span>
          </label>
        </div>
      </div>
    </div>
  );
} 