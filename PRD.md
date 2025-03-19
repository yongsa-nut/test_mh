# Monster Hunter Data Website - Product Requirements Document

## Project Overview
A website to display Monster Hunter game data for normal skills, set skills, and i-frame data. The website will have a homepage with navigation to three separate pages for each data type.

## Technology Stack
- **Frontend Framework**: Next.js (React-based)
- **Styling**: Tailwind CSS
- **Data Handling**: CSV parsing with Papa Parse

## Features and Requirements

### Homepage
- Display three clear options for users to navigate to different data sections
- Clean, game-themed design
- Simple navigation menu

### Normal Skills Page (สกิลทั่วไป)
- Display all normal skills in a structured table/card format
- Search functionality to filter skills by name or properties
- Sort capability by different columns

### Set Skills Page (สกิลชุดเซ็ท)
- Display all set skills in a structured table/card format
- Search functionality to filter set skills
- Sort capability by different columns

### I-Frame Data Page
- Display i-frame data for both frame and second measurements
- Visual representation of the data (optional)
- Search/filter capability

### General Requirements
- Responsive design that works on mobile and desktop
- Fast loading times
- Clean, readable presentation of data
- Consistent styling across pages

## Data Sources
The application will use the following CSV data files:
- `MHWilds Ver 1.0 KenXtinct - สกิลทั่วไป.csv` - Normal skills data
- `MHWilds Ver 1.0 KenXtinct - สกิลชุดเซ็ท.csv` - Set skills data
- `MHWilds Ver 1.0 KenXtinct - i-frame table (frame).csv` - I-frame data in frames
- `MHWilds Ver 1.0 KenXtinct - i-frame table (second).csv` - I-frame data in seconds

## Implementation Plan
1. Set up Next.js project structure
2. Create basic page layouts and navigation
3. Implement CSV data loading and parsing
4. Build individual data display pages
5. Implement search and filter functionality
6. Add styling and responsive design

## Future Considerations
- Adding additional Monster Hunter game data
- Advanced filtering capabilities
- Multi-language support
- Dark/light theme toggle 