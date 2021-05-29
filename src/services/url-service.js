const { URLs, db } = require("../models/db");
const { int2radix64, radix64toint } = require("../services/radix64-service");

/** Insert randomly generated link with hash ID  */

async function createRandomShortCode(link) {
  /** Maximum digits of the random code can be 13, The will be 0 ---> 9999999999999 */
  const ranGenCode = parseInt(Math.random() * 10000000000000);

  /** To avoid collision of existing same random code
   * check generated id exist or not
   */
  const existElm = await URLs.findOne({
    where: { id: ranGenCode },
  });
  /** If it exist we will check again for another random code */

  if (existElm) return await createRandomShortCode(link);

  /** else create new record with genrated code for the input link */

  return await URLs.create({
    id: ranGenCode,
    code: int2radix64(ranGenCode),
    link: link,
  });
}

/** User can also request to create their own short code  */

async function createCustomShortCode(code, link) {
  /** Get the ID first for the requested code */
  //TODO validate code
  const idForReqCode = radix64toint(code);

  /** check if ID already exist or not  */

  const isIdExist = await URLs.findOne({ where: { id: idForReqCode } });

  if (isIdExist)
    throw Error("The Requested short code [" + code + "] already exist!");

  return URLs.create({
    id: idForReqCode,
    code: code,
    link: link,
  });
}

/** Get Actual URL */

async function getLongUrl(code) {
  const id = radix64toint(code);
  return await URLs.findOne({
    where: {
      id,
    },
  });
}
module.exports = {
  createCustomShortCode,
  createRandomShortCode,
  getLongUrl,
};
