import {
  app,
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
} from "@azure/functions";

export async function healthCheck(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  context.log(`Http function processed request for url "${request.url}"`);
  const slotName = process.env["APPSETTING_WEBSITE_SLOT_NAME"];

  let configurationHealthCheck = slotName;

  return {
    status: 200,
    jsonBody: {
      reason: "healthy",
      slotName,
      url: request.url,
      configurationHealthCheck,
    },
  };
}

app.http("healthCheck", {
  methods: ["GET"],
  authLevel: "anonymous",
  handler: healthCheck,
});
