import { useState, useEffect, useRef } from 'react';
import { Doctor } from '../types/doctor';

interface SearchBarProps {
  searchQuery: string;
  onSearch: (query: string) => void;
  doctors: Doctor[];
}

export default function SearchBar({ searchQuery, onSearch, doctors }: SearchBarProps) {
  const [suggestions, setSuggestions] = useState<Doctor[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (value: string) => {
    onSearch(value);
    if (value.trim()) {
      const filtered = doctors
        .filter(doctor =>
          doctor.name.toLowerCase().includes(value.toLowerCase())
        );
      setSuggestions(filtered);
      setIsOpen(true);
    } else {
      setSuggestions([]);
      setIsOpen(false);
    }
  };

  const handleSuggestionClick = (doctor: Doctor) => {
    onSearch(doctor.name);
    setIsOpen(false);
  };

  return (
    <div ref={wrapperRef} className="relative w-full max-w-2xl mx-auto">
      <input
        type="text"
        data-testid="autocomplete-input"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Search doctors by name..."
        value={searchQuery}
        onChange={(e) => handleInputChange(e.target.value)}
      />
      {isOpen && suggestions.length > 0 && (
        <div className="absolute w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-96 overflow-y-auto">
          {suggestions.map((doctor) => (
            <div
              key={doctor.id}
              data-testid="suggestion-item"
              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
              onClick={() => handleSuggestionClick(doctor)}
            >
              {doctor.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 