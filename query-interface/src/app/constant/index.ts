export const BASE_URL_API = "http://localhost:3000/api/logs";

export const options = [
  "Message",
  "ResourceId",
  "Timestamp",
  "TraceId",
  "SpanId",
  "Commit",
];

export const handlePlaceHolderforFilter = (option: string) => {
  switch (option) {
    case "ResourceId":
      return "Enter resourceId";
    case "Timestamp":
      return "Enter Timestamp";
    case "TraceId":
      return "Enter TraceId";
    case "SpanId":
      return "Enter SpanId";
    case "Commit":
      return "Enter Commit";
    case "Message":
      return "Enter message";
    default:
      return "Enter value";
  }
};
