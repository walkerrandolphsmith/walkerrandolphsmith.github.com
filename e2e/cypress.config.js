const { defineConfig } = require("cypress");
const { createTestAccount } = require("nodemailer");
const { connect } = require("imap-simple");
const { simpleParser } = require("mailparser");

const createEmailAccount = async () => {
  const testAccount = await createTestAccount();
  const emailConfig = {
    imap: {
      user: testAccount.user,
      password: testAccount.pass,
      host: "imap.ethereal.email",
      port: 993,
      tls: true,
      authTimeout: 10000,
    },
  };
  const userEmail = {
    email: testAccount.user,
    async getLastEmail() {
      try {
        console.log(testAccount.user);
        const connection = await connect(emailConfig);
        await connection.openBox("INBOX");
        const searchCriteria = ["1:50"];
        const fetchOptions = {
          bodies: [""],
        };
        const messages = await connection.search(searchCriteria, fetchOptions);
        connection.end();
        console.log("emails", messages);
        if (!messages.length) return null;
        const mail = await simpleParser(
          messages[messages.length - 1].parts[0].body
        );
        return {
          subject: mail.subject,
          text: mail.text,
          html: mail.html,
        };
      } catch (error) {
        console.log(error);
        return null;
      }
    },
  };

  return userEmail;
};

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    downloadsFolder: "src/downloads",
    fixturesFolder: "src/fixtures",
    screenshotsFolder: "src/screenshots",
    specPattern: "src/tests/**/*.cy.ts",
    supportFile: "src/support/e2e.ts",
    videosFolder: "src/videos",
    async setupNodeEvents(on, config) {
      const emailAccount = await createEmailAccount();
      on("task", {
        getUserEmail() {
          return emailAccount.email;
        },

        getLastEmail() {
          return emailAccount.getLastEmail();
        },
      });
    },
  },
});
