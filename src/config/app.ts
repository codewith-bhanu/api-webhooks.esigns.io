export const config = {
  app: {
    port: process.env.PORT || 3000,
    api_version: process.env.API_VERSION as string,
  },

  db: {
    mongo_uri: process.env.MONGO_URI as string,
  },

  amqp: {
    url: process.env.AMQP_URL as string,
  },
};
