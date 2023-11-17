import { Client } from "@elastic/elasticsearch";

// ? check for client status
const getClientInfo = async (client: Client) => {
  client
    .info()
    .then((response) => console.log(response))
    .catch((error) => console.error(error));
};

export { getClientInfo };
