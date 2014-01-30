// Apply defaults and processing to conf.json.

var conf = require("../conf.json"),
  logger = require("./logging").getLogger(),
       _ = require('underscore');

var options = _.extend({
    UNHANGOUT_HOST: "localhost",
    UNHANGOUT_PORT: 7777,
    UNHANGOUT_USE_SSL: true,
    UNHANGOUT_REDIS_HOST: "localhost",
    UNHANGOUT_REDIS_PORT: 6379,
    UNHANGOUT_REDIS_DB: 0,
    UNHANGOUT_SESSION_SECRET: "fake secret",
    mockAuth: false,
    persist: true
}, conf);

// Set up the base URL based on config.
options.baseUrl = (options.UNHANGOUT_USE_SSL ? "https://" : "http://") + options.UNHANGOUT_HOST;
// Append the port if we're using a non-standard one.
var nonStandardPort = ((options.UNHANGOUT_USE_SSL && options.UNHANGOUT_PORT != 443) ||
    (!options.UNHANGOUT_USE_SSL && options.UNHANGOUT_PORT != 80));
if (nonStandardPort) {
    options.baseUrl += ":" + options.UNHANGOUT_PORT;
}
// Enforce the presence of google config params.
var err;
if (!options.UNHANGOUT_GOOGLE_CLIENT_ID) {
    err = "Missing UNHANGOUT_GOOGLE_CLIENT_ID in configuration.";
}
if (!options.UNHANGOUT_GOOGLE_CLIENT_SECRET) {
    err = "Missing UNHANGOUT_GOOGLE_CLIENT_ID in configuration.";
}
if (err) {
    logger.error(err);
    throw new Error(err);
}

module.exports = options;