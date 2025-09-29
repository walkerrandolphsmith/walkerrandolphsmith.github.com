import {
  app,
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
} from "@azure/functions";
import { renderToString } from "react-dom/server";
import { createElement } from "react";
import WelcomeEmail from "../templates/WelcomeEmail";
import { v4 as uuid } from "uuid";
import emailClientFactory from "../utilities/emailClientFactory";
import storageTableClientFactory from "../utilities/storageTableClientFactory";

type RequestBody = {
  email: string;
  isJavaScriptEnabled: boolean;
};

type ContactFormSubmissionMessage = {
  environment: string;
  messageId: string;
  email: string;
};

const getRequestBody = async (request: HttpRequest): Promise<RequestBody> => {
  const contentType = request.query.get("type");
  if (contentType === "application/json")
    return (await request.json()) as RequestBody;

  const formData = await request.formData();
  return {
    email: formData.get("email") as string,
    isJavaScriptEnabled: false,
  };
};

const sendEmail = async (serviceBusMessage: ContactFormSubmissionMessage) => {
  const emailClient = await emailClientFactory();
  const element = createElement(WelcomeEmail, {
    email: serviceBusMessage.email,
  });
  const message = {
    senderAddress: "admin@walkerrandolphsmith.com",
    content: {
      subject: "Potential Subscriber",
      html: renderToString(element as any),
    },
    recipients: {
      to: [
        {
          address: "walkerrandolphsmith@gmail.com",
          displayName: "Walker Smith",
        },
      ],
    },
  };

  const poller = await emailClient.beginSend(message);
  await poller.pollUntilDone();
};

type ContactRequest = {
  email: string;
};

const recordSubmission = async (
  serviceBusMessage: ContactFormSubmissionMessage
) => {
  const client = await storageTableClientFactory();
  return await client.createEntity<ContactRequest>({
    partitionKey: serviceBusMessage.environment,
    rowKey: serviceBusMessage.messageId,
    email: serviceBusMessage.email,
  });
};

const buildMessage = (
  body: Partial<RequestBody>
): ContactFormSubmissionMessage => {
  const { email } = body;
  const id = uuid();
  return {
    environment: process.env["APPSETTING_WEBSITE_SLOT_NAME"] || "local",
    messageId: id,
    email,
  };
};

const processSubmission = async (body: Partial<RequestBody>) => {
  const message = buildMessage(body);

  console.log("message", JSON.stringify(message, null, 2), "\n");

  await Promise.all([sendEmail(message), recordSubmission(message)]);
};

export async function handleContactFormSubmission(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  context.log(`Http function processed request for url "${request.url}"`);
  let body: Partial<RequestBody> = {};
  try {
    body = await getRequestBody(request);
  } catch (error) {
    return {
      status: 400,
      jsonBody: { reason: error.message },
    };
  }

  const origin = process.env["WEB_ORIGIN"];

  const { email, isJavaScriptEnabled } = body;
  try {
    await processSubmission(body);
    if (!isJavaScriptEnabled)
      return {
        status: 302,
        headers: {
          Location: `${origin}/contactus#contact-us-submission-message`,
        },
      };

    return {
      status: 200,
      jsonBody: {
        reason: "Form submitted successfully",
        email,
      },
    };
  } catch (error) {
    if (!isJavaScriptEnabled) {
      return {
        status: 302,
        headers: {
          Location: `${origin}/contactuserror#contact-us-submission-message`,
        },
      };
    }
    return {
      status: 500,
      jsonBody: { reason: "Failed to create record", message: error.message },
    };
  }
}

app.http("handleContactFormSubmission", {
  methods: ["POST"],
  authLevel: "anonymous",
  handler: handleContactFormSubmission,
});
