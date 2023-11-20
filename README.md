## Table of Contents

- [Problem Statement](#problem)
- [Log Ingestion](#log-ingestion)
  - [Tech Stack and Why Elastic Search](#tech-stack-and-why-elastic-search)
  - [Installation](#installation-log-ingestion)
  - [Data Population](#data-population)
  - [Load Testing Results](#load-testing-results)
- [Query Interface](#query-interface)
  - [Tech Stack](#tech-stack)
  - [Installation](#install-query-intenface)
  - [Demo Video](#demo-video)
- [Features Implemented](#feature-implemented)

## Problem Statement

1. Develop a log ingestor system that can efficiently handle vast volumes of log data, and offer a simple interface for querying this data using full-text search or specific field filters.

- Develop a mechanism to ingest logs in the provided format.
- Ensure scalability to handle high volumes of logs efficiently.

2.  Offer a user interface (Web UI or CLI) for full-text search across logs.

- Include filters based on:
  - level
  - message
  - resourceId
  - timestamp
  - traceId
  - spanId
  - commit

Sample Log Data Format:

```json
 {
  "level": "error",
  "message": "Failed to connect to DB",
  "resourceId": "server-1234",
  "timestamp": "2023-09-15T08:00:00Z",
  "traceId": "abc-xyz-123",
  "spanId": "span-456",
  "commit": "5e5342f",
  "metadata": {
    "parentResourceId": "server-0987"
  }
}

```

## Log Ingestion

### Tech Stack and Why Elastic Search

The Log Ingestor is implemented in Node.js (TypeScript) and Express.js and uses Elasticsearch as the database due to its scalability and efficient full-text search capabilities.

### Installation Log Ingestion

1. Clone the repository
   ```bash
   git clone https://github.com/dyte-submissions/november-2023-hiring-0xVikasRushi
   cd log-ingestor
   ```
2. Configure Elasticsearch connection and set the following environment variables in a .env file:

```bash
ELASTIC_CLOUD_ID=your-elastic-cloud-id
ELASTIC_USERNAME=your-elastic-username
ELASTIC_PASSWORD=your-elastic-password
```

3. Start the Log Ingestor it automatically start on port `3000`

```bash
npm run dev
```

# Data Population

To ensure the log ingestion system can effectively handle a vast volume of logs, I really wanted to conduct a load test using Artillery after building the API.

The goal was to verify the log-ingestion's capability to handle a significant number of requests. if "yes" how many?

As mentioned Express Framework can handle 15k/req per second in benchmarks and I recently realised inorder increases Api performance more efficiently i think instead of Express over Fastify much better option but its already too late.

In the `artillery.config.yml` file, you can find the configuration for the third phase of load testing. The response details are available in the `report-express.json` file.

I used Artillery to execute multiple concurrent requests in three phases to populate the logs. In total, I added over 1.64 lakh logs in Elasticsearch

<img alt="elastic-search" src="https://github.com/dyte-submissions/november-2023-hiring-0xVikasRushi/assets/88543171/122eda63-1313-49b3-83ef-379b259f8723" width="600">

## Load Testing Results

Let's examine the population results:

| Request        | Rate          | http.response.time Mean |
| -------------- | ------------- | ----------------------- |
| `request-rate` | `100 req/sec` | 261 milliseconds        |
| `request-rate` | `200 req/sec` | 284 milliseconds        |

To Run Load balancing Test

```
npm run test
```

<img alt="load-test" src="https://github.com/dyte-submissions/november-2023-hiring-0xVikasRushi/assets/88543171/5ad138dc-f547-436f-93f6-7b47de714a75" width="600">

## Query Interface

### Tech Stack with Next.js

The Query Interface is implemented using Next.js, Typescript and TailwindCSS

### Installation

To set up the Query Interface locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/dyte-submissions/november-2023-hiring-0xVikasRushi
   cd query-interface
   ```

2. Install and run the server

   ```bash
    npm install
    npm run dev
   ```

### Demo Video

https://github.com/dyte-submissions/november-2023-hiring-0xVikasRushi/assets/88543171/3f3399db-4039-418d-b9b2-0c86d9c557e9

## Features Implemented

- [x] Log Ingestion
  - [x] Develop a mechanism to ingest logs in the provided format.
  - [x] Elasticsearch chosen for scalability and efficient full-text search capabilities\
  - [x] Ensure scalability to handle high volumes of logs efficiently
  - [x] Custom Load Testing and Data Population for accurate results
- [x] Query Interface
  - [x] Offer a user interface (Web UI or CLI) for full-text search across logs.
  - [x] Include filters based on:
    - [x] level
    - [x] message
    - [x] resourceId
    - [x] timestamp
    - [x] spanID
    - [x] commit
    - [x] meta.parentResourceId
- [ ] Extra Mutiple
  - [x] Provide real-time log ingestion and searching capabilities.
  - [ ] Implement search within specific date ranges.
  - [ ] Utilize regular expressions for search.
  - [ ] Allow combining multiple filters.
  - [ ] Implement role-based access to the query interface.
