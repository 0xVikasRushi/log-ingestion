export const options = [
  "message",
  "resourceId",
  "timestamp",
  "traceId",
  "spanId",
  "commit",
];

export const handlePlaceHolderforFilter = (option: string) => {
  switch (option) {
    case "resourceId":
      return "Enter resourceId";
    case "timestamp":
      return "Enter timestamp";
    case "traceId":
      return "Enter traceId";
    case "spanId":
      return "Enter spanId";
    case "commit":
      return "Enter commit";
    case "metadata":
      return "Enter metadata parentId";
    case "message":
      return "Enter message";
    default:
      return "Enter value";
  }
};
