# PROTECT Visual Data Dictionary

An interactive data dictionary viewer for the PROTECT study dataset. Users can browse variables by category and form, view data types and field descriptions, select variables of interest, and visualize intersections between selected variables.

**[Live Demo](https://manati.ece.neu.edu/dictionary/diz_test/client/build/)**

## Features

- **Hierarchical navigation** — browse variables by Type → Form → Section
- **Data table** — view variable ID, description, data type, choices, and notes
- **Variable selection** — pick variables to compare in the right panel
- **UpSet diagram** — visualize intersections between selected variables
- **Export** — download the current table view as a CSV
- **Download** — download the full data dictionary CSV from the header

## Project Structure

```
Diz_test/
├── client/        # React frontend (Create React App)
└── service/       # Node.js + Express backend (SQL Server connection)
```

## Getting Started

### Prerequisites

- Node.js 14+
- Access to the PROTECT SQL Server database

### Frontend

```bash
cd client
npm install
npm start
```

Runs on `http://localhost:3000`.

### Backend

```bash
cd service
cp .env.example .env   # fill in your DB credentials
npm install
npm start
```

Runs on port `8080`.

### Environment Variables

Copy `service/.env.example` to `service/.env` and fill in:

```
DB_USER=your_db_username
DB_PASSWORD=your_db_password
DB_NAME=your_database_name
DB_SERVER=your_server_ip
DB_PORT=61235
```

### Production Build

```bash
cd client
npm run build
```

The `build/` folder is served as static files via IIS.

## Data

The main dataset is `client/public/data/bioPlayground_combined2.csv` — a REDCap data dictionary export covering Biological, Environmental, Human Subject, CRECE, and MOMs data types.
