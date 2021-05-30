const { Router } = require("express");
const route = Router();

const { getLongUrl } = require("../services/url-service");

/** Redirecting user to the actual link
 * if short code exist
 */
/**
 * GET /api/links/xxxxx
 * RESPONSE
 *      link:
 */
route.get("/:code", async (req, res) => {
  const getCode = req.params.code;
  const url = await getLongUrl(getCode);
  const httpURL = url?.link.includes("http")
    ? url?.link
    : "https://" + url?.link;
  if (url) res.redirect(httpURL);
  else return res.status(404).json({ error: "No such shortcode created" });
});

module.exports = route;
