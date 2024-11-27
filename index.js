// import { faker } from "@faker-js/faker";
import { en_IN, Faker } from "@faker-js/faker";
import express from "express";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import firebase from "./firebase.js";
import { Client } from "@notionhq/client";
import * as dotenv from "dotenv";

dotenv.config(); 

const app = express();

const auth = getAuth(firebase);

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

export const faker = new Faker({
  locale: [en_IN],
});

app.get("/", async (req, res) => {
  const tempmail =
    faker.person.firstName() +
    ["_", ".", "-"][Math.floor(Math.random() * 3)] + // Random separator
    faker.person.lastName() +
    faker.number.int({ min: 10, max: 999 }) + // Random 2-3 digit number
    "@gmail.com";
  res.send(tempmail);
});

const SaveUser = async (email, password) => {
  try {
    await notion.pages.create({
      parent: {
        database_id: process.env.NEXT_PUBLIC_NOTION_DATABASE_ID,
      },
      properties: {
        Email: {
          title: [
            {
              text: {
                content: email,
              },
            },
          ],
        },
        Password: {
          rich_text: [
            {
              text: {
                content: password,
              },
            },
          ],
        },
      },
    });

    console.log("User Created updated successfully");
  } catch (error) {
    console.error("Error updating status:", error);
  }
};

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

app.post("/createUsers", async (req, res) => {
  try {
    for (let i = 0; i < 97; i++) {
      const email =
        faker.person.firstName() +
        ["_", ".", "-"][Math.floor(Math.random() * 3)] + // Random separator
        faker.person.lastName() +
        faker.number.int({ min: 10, max: 999 }) + // Random 2-3 digit number
        "@gmail.com";
      // const email = faker.internet.email();
      const password = faker.internet.password();

      // Create user with email and password
      await sleep(5000);
      const user = await createUserWithEmailAndPassword(auth, email, password);

      // Save the user data
      await SaveUser(email, password);
    }

    res.send("97 Users Created successfully");
  } catch (error) {
    res.send(error);
  }
});

const startServer = async () => {
  try {
    app.listen(5190, () => {
      console.log(`Server is running on port at http://localhost:5190/`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();