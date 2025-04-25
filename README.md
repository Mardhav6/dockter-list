# Doctor Listing Application

A Next.js application that displays a list of doctors with filtering, sorting, and search capabilities.

## Features

- Autocomplete search for doctor names
- Filter by consultation type (Video Consult/In Clinic)
- Filter by multiple specialties
- Sort by fees (ascending) or experience (descending)
- Responsive design
- URL-based filter state management

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Technology Stack

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Axios

## Project Structure

```
src/
  ├── app/
  │   ├── page.tsx        # Main page component
  │   └── globals.css     # Global styles
  ├── components/
  │   ├── SearchBar.tsx   # Autocomplete search component
  │   ├── FilterPanel.tsx # Filters and sorting component
  │   └── DoctorList.tsx  # Doctor cards list component
  └── types/
      └── doctor.ts       # TypeScript interfaces and types
```

## API Integration

The application fetches doctor data from:
```
https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json
```

## Testing

All components include data-testid attributes as specified in the requirements for automated testing. 