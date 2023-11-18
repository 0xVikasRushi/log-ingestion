import axios from "axios";

const generateRandomId = () => {
  return Math.random().toString(36).substring(2, 15);
};

const generateRandomLog = () => {
  const logLevels = ["info", "warning", "error"];
  const randomLogLevel =
    logLevels[Math.floor(Math.random() * logLevels.length)];

  const log = {
    level: "concurrent",
    message: `Log message ${Math.random()}`,
    resourceId: generateRandomId(),
    timestamp: new Date().toISOString(),
    traceId: generateRandomId(),
    spanId: generateRandomId(),
    commit: generateRandomId(),
    metadata: {
      parentResourceId: generateRandomId(),
    },
  };

  return log;
};

const sendData = async (logCount: number) => {
  try {
    console.time("DataPopulationTime");

    for (let i = 0; i < logCount; i++) {
      const log = generateRandomLog();
      const req = await axios.post("http://localhost:3000/api/logs", log);
      if (req.status === 200) {
        console.log(`Log ${i + 1} sent.`);
      }
    }

    console.timeEnd("DataPopulationTime");
    console.log("Data population completed.");
  } catch (error) {
    console.error("Error sending data:", error.message);
  }
};

const numberOfLogs = 10000;
sendData(numberOfLogs);
