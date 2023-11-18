const generateRandomId = () => {
  return Math.random().toString(36).substring(2, 15);
};

const generateRandomLog = (requestParams, ctx, ee, next) => {
  const logLevels = ["info", "warning", "error"];
  const randomLogLevel =
    logLevels[Math.floor(Math.random() * logLevels.length)];

  const log = {
    level: "concurrent test v1",
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

  ctx.vars["level"] = log.level;
  ctx.vars["message"] = log.message;
  ctx.vars["resourceId"] = log.resourceId;
  ctx.vars["timestamp"] = log.timestamp;
  ctx.vars["traceId"] = log.traceId;
  ctx.vars["spanId"] = log.spanId;
  ctx.vars["commit"] = log.commit;
  ctx.vars["metadata"] = log.metadata;
  return next();
};

module.exports = {
  generateRandomLog,
};
