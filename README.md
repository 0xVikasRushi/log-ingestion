## Table of Contents
- [Log Ingestion](#log-ingestion)
    - [Tech Stack and Why Elastic Search](#tech-stack-and-why-elastic-search)
    - [Installation](#installation-log-ingestion)
    - [Data Population](#data-population)
    - [Load Testing Results](#load-testing-results)
- [Query Interface](#query-interface)
  - [Tech Stack](#tech-stack)
  - [Installation](#install-query-intenface)

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

| Request         | Rate           | http.response.time Mean   |
| ------------------ | -------------- | -------------------------- |
| `request-rate`    | `100 req/sec`  | 261 milliseconds           |


To Run Load balancing Test 
```
npm run test
```


<img alt="load-test" src="https://github.com/dyte-submissions/november-2023-hiring-0xVikasRushi/assets/88543171/5ad138dc-f547-436f-93f6-7b47de714a75" width="600">











