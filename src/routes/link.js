const { Router } = require("express");
const {
  createRandomShortCode,
  createCustomShortCode,
  getLongUrl,
} = require("../services/url-service");
const route = Router();

const urlPattern =
  /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/gm;

const codePattern = /^[a-zA-Z0-9_-]{7}$/g;

const errorMsgs = {
  EMPTY_URL: "Link can not be blank!",
  INVALID_URL_PATTERN: "Invalid URL!",
  INVALID_CODE:
    "Code criteria did not match! Code has to be 7 chars [A-Z, a-z, 0-9, _,-]",
};
/**
 * POST api/links
 * BODY
 *     ----- required ----
 *     link: https://xxxx.xxxx/xxxx
 *     ---- optional ----
 *     code
 */

route.post("/", async (req, res) => {
  const link = req.body.link;
  const code = req.body.code;

  // validate link must exist
  if (!link) return res.status(400).json({ error: errorMsgs.EMPTY_URL });

  // link must be a valid URL
  if (!link.match(urlPattern))
    return res.status(400).json({ error: errorMsgs.INVALID_URL_PATTERN });

  //create random short code if there is no short code
  if (!code) {
    const url = await createRandomShortCode(link);
    return res.json(url);
  }

  try {
    if (!code.match(codePattern))
      return res.status(400).json({
        error: errorMsgs.INVALID_CODE,
      });

    const url = await createCustomShortCode(code, link);
    return res.json(url);
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
});

module.exports = route;
