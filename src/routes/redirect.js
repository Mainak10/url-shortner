const { Router } = require("express");
const route = Router();

const { getLongUrl } = require("../services/url-service");

route.get("/:code", async (req, res) => {
  const getCode = req.params.code;
  const url = await getLongUrl(getCode);
  if (url) res.redirect(url.link);
  else res.redirect("https://instagram.com");
});

module.exports = route;
