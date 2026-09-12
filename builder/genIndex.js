const fs = require("fs");
const path = require("path");

const genIndex = function (markup) {
  let html = fs.readFileSync(path.join(__dirname, "../src/template.html"), {
    encoding: "utf-8",
  });

  let readTime = "",
    readVar = "";

  if (markup.length) {
    readTime = (markup.split(" ").length / 200) * 60;
    readVar = `<style>:root{
      --readTime: ${Math.round(readTime) + 25}s;
    }</style>`;
  }

  html = html
    .replaceAll("{{^READ_TIME}}", readVar)
    .replaceAll("{{^SCROLL_MSG}}", markup)
    .replaceAll(
      "{{^HBD_MSG}}",
      process.env.HBD_MSG || "Wish you a very Happy Birthday"
    )
    .replaceAll("{{^NAME}}", process.env.NAME)
    .replaceAll("{{^NICKNAME}}", process.env.NICKNAME || process.env.NAME);

  fs.writeFileSync(path.join(__dirname, "../src/index.html"), html, {
    encoding: "utf-8",
  });
  console.log("Index Generated");
};

module.exports = genIndex;
