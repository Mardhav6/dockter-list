import React, { useState } from 'react';
import Image from 'next/image';

interface Doctor {
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

interface DoctorListProps {
  doctors: Doctor[];
}

export default function DoctorList({ doctors }: DoctorListProps) {
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const handleImageError = (doctorId: string) => {
    setImageErrors(prev => ({ ...prev, [doctorId]: true }));
  };

  if (doctors.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">No doctors found matching your criteria.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {doctors.map((doctor) => (
        <div key={doctor.id} className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="relative h-48 w-full">
            {!imageErrors[doctor.id] ? (
              <Image
                src={doctor.photo}
                alt={doctor.name}
                fill
                className="object-cover"
                onError={() => handleImageError(doctor.id)}
                priority={true}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                unoptimized={true}
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl font-bold text-gray-400 mb-2">
                    {doctor.name_initials}
                  </div>
                  <span className="text-gray-500 text-sm">No image available</span>
                </div>
              </div>
            )}
          </div>
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-2">{doctor.name}</h3>
            <p className="text-gray-600 mb-2">{doctor.introduction}</p>
            <div className="flex flex-wrap gap-2 mb-2">
              {doctor.specialties.map((specialty, index) => (
                <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                  {specialty}
                </span>
              ))}
            </div>
            <p className="text-gray-600 mb-2">{doctor.experience} years of experience</p>
            <p className="text-gray-600 mb-2">₹{doctor.fee} consultation fee</p>
            <p className="text-gray-600 mb-2">{doctor.clinicName}</p>
            <p className="text-gray-600 mb-2">{doctor.location}</p>
            <div className="flex flex-wrap gap-2">
              {doctor.consultationModes.map((mode, index) => (
                <span key={index} className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                  {mode}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
} 