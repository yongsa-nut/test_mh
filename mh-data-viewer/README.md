# Monster Hunter Data Viewer

A web application for viewing Monster Hunter game data, including normal skills, set skills, and i-frame data.

## Features

- **Homepage** with navigation to the three data sections
- **Normal Skills Page** to view normal skills (สกิลทั่วไป) with search functionality
- **Set Skills Page** to view set skills (สกิลชุดเซ็ท) with search functionality
- **I-Frame Data Page** to view i-frame data in both frames and seconds, with search functionality

## Technology Stack

- **Frontend Framework**: Next.js
- **Styling**: Tailwind CSS
- **Data Handling**: CSV parsing with Papa Parse

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Installation

1. Clone the repository
   ```
   git clone <repository-url>
   ```

2. Install dependencies
   ```
   cd mh-data-viewer
   npm install
   ```

3. Run the development server
   ```
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application

## Project Structure

```
mh-data-viewer/
├── app/                    # Next.js app directory
│   ├── api/                # API routes
│   ├── normal-skills/      # Normal skills page
│   ├── set-skills/         # Set skills page
│   ├── i-frame-data/       # I-frame data page
│   ├── layout.tsx          # Main layout component
│   ├── page.tsx            # Homepage
│   └── globals.css         # Global CSS
├── components/             # React components
├── data/                   # CSV data files
├── lib/                    # Helper functions and types
├── public/                 # Static assets
└── ...                     # Configuration files
```

## Data Sources

The application uses the following CSV data files:

- `MHWilds Ver 1.0 KenXtinct - สกิลทั่วไป.csv` - Normal skills data
- `MHWilds Ver 1.0 KenXtinct - สกิลชุดเซ็ท.csv` - Set skills data
- `MHWilds Ver 1.0 KenXtinct - i-frame table (frame).csv` - I-frame data in frames
- `MHWilds Ver 1.0 KenXtinct - i-frame table (second).csv` - I-frame data in seconds 