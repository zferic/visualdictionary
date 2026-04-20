# PROTECT Visual Data Dictionary

An interactive data dictionary viewer built for the [PROTECT study](https://protect.northeastern.edu/) — a longitudinal cohort study examining environmental exposures and their effects on health outcomes in Puerto Rico. The dictionary covers thousands of variables across Biological, Environmental, Human Subject, CRECE, and MOMs data types, all sourced from REDCap instrument exports.

The app lets researchers browse the full variable catalog through a hierarchical navigation tree, inspect field-level metadata (data type, choices, validation rules, branching logic), select variables of interest, and visualize how those variables overlap across study participants using an interactive UpSet diagram.

**[Live Demo](https://manati.ece.neu.edu/dictionary/diz_test/client/build/)**

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 17, Material-UI, React Bootstrap |
| Data tables | react-data-table-component |
| Visualization | D3 v6, @upsetjs/react |
| CSV parsing | react-papaparse (web worker) |
| Layout | react-reflex (resizable panels) |
| Backend | Node.js + Express |
| Database | Microsoft SQL Server (via mssql / tedious) |
| Hosting | Windows IIS (static build + Express API) |

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
