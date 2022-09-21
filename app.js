const express = require("express");
const axios = require("axios");
const cors = require("cors");
const { createClient } = require("redis");

const redisClient = createClient();
redisClient.on("error", (err) => console.log("Redis Client Error", err));
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/photos", async (req, res) => {
  const albumId = req.query.albumId;
  await redisClient.connect();

  const photos = await getOrSetCache(`photos?albumId=?${albumId}`, async () => {
    const { data } = await axios.get(
      "https://jsonplaceholder.typicode.com/photos",
      { params: { albumId } }
    );
    return data;
  });

  await redisClient.quit();

  res.json(photos);
});

app.get("/photos/:id", async (req, res) => {
  await redisClient.connect();

  const photo = await getOrSetCache(`photos:${req.params.id}`, async () => {
    const { data } = await axios.get(
      `https://jsonplaceholder.typicode.com/photos/${req.params.id}`
    );
    return data;
  });

  await redisClient.quit();
  res.json(photo);
});

async function getOrSetCache(key, cb) {
  const promise = new Promise(async (resolve, reject) => {
    const flag = await redisClient.exists(key);
    if (flag) {
      return resolve(JSON.parse(await redisClient.get(key)));
    } else {
      const freshData = await cb();
      await redisClient.set(key, JSON.stringify(freshData));
      resolve(freshData);
    }
  });
  return promise;
}

app.listen(3000);
