// Load environment variables from .env file
require("dotenv").config();

const express = require("express");
const app = express();
const PORT = process.env.DEV_PORT || 8081;
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const querystring = require("querystring");
const cookieParser = require("cookie-parser");
const axios = require("axios");

// Middleware Setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true, // Allow cookies to be sent
  })
);
app.use(morgan("dev"));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});

const client_id = "7d3cccc6945042f69271b9710e05e447";
const client_secret = "a8dd50976953482891f0b8e1cd07a6ba";
const redirect_uri = "http://localhost:8080/callback";

// Helper function to generate a random string
function generateRandomString(length) {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

app.get("/login", function (req, res) {
  const state = generateRandomString(16);
  const scope = "user-read-private user-read-email";
  res.redirect(
    "https://accounts.spotify.com/authorize?" +
      querystring.stringify({
        response_type: "code",
        client_id: client_id,
        scope: scope,
        redirect_uri: redirect_uri,
        state: state,
      })
  );
});

app.get("/callback", function (req, res) {
  var code = req.query.code || null;
  var state = req.query.state || null;

  if (state === null) {
    res.redirect(
      "/#" +
        querystring.stringify({
          error: "state_mismatch",
        })
    );
  } else {
    const authOptions = {
      url: "https://accounts.spotify.com/api/token",
      method: "post",
      data: querystring.stringify({
        code: code,
        redirect_uri: redirect_uri,
        grant_type: "authorization_code",
      }),
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " +
          new Buffer.from(client_id + ":" + client_secret).toString("base64"),
      },
      json: true,
    };

    axios(authOptions)
      .then((response) => {
        if (response.status === 200) {
          console.log("##: ", response.data);
          const access_token = response.data.access_token;
          const refresh_token = response.data.refresh_token;

          res.cookie("access_token", access_token);

          // Set the refresh token in an HTTP-only cookie
          res.cookie("refresh_token", refresh_token, {
            httpOnly: true,
            secure: true,
            sameSite: "Strict",
          });

          // Redirect to the frontend profile page with access token
          res.redirect(`http://localhost:3000/profile`);
        }
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ error: "Failed to get access token" });
      });
  }
});

app.get("/refresh_token", function (req, res) {
  var refresh_token = req.query.refresh_token;
  var authOptions = {
    url: "https://accounts.spotify.com/api/token",
    method: "post",
    data: querystring.stringify({
      grant_type: "refresh_token",
      refresh_token: refresh_token,
    }),
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " +
        new Buffer.from(client_id + ":" + client_secret).toString("base64"),
    },
    json: true,
  };

  axios(authOptions)
    .then((response) => {
      if (response.statusCode === 200) {
        const access_token = response.data.access_token;
        const new_refresh_token = response.data.refresh_token || refresh_token; // Use the new refresh token if provided
        res.send({
          access_token: access_token,
          refresh_token: new_refresh_token,
        });
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: "Failed to refresh access token" });
    });
});

app.listen(PORT, () => {
  console.log(`App listening on port: ${PORT}`);
});
