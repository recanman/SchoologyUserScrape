// made by recanman
const uuidv4 = require("uuid/v4")
const axios = require("axios")

const API_URL = "https://api.schoology.com/v1/users?limit={0}&start={1}"
const AUTH_HEADER = `
    OAuth realm="Schoology API",
    oauth_consumer_key="{0}",
    oauth_nonce="{1}",
    oauth_timestamp="{2}",
    oauth_signature_method="PLAINTEXT",
    oauth_version="1.0",
    oauth_signature="{3}%26"
`

// From https://stackoverflow.com/a/69718380
String.prototype.format = function () {
    var args = arguments;
    return this.replace(/{([0-9]+)}/g, function (match, index) {
      // check if the argument is there
      return typeof args[index] == 'undefined' ? match : args[index];
    });
  };

let config = require("./config.json")

let headers = {
    Accept: "application/json",
    Authentication: AUTH_HEADER.format(config.consumerKey, uuidv4(), Date.now(), config.consumerSecret)
}

let results = "N/A"

axios.get(API_URL.format(config.userLimit, config.userStartAt), {headers: headers}).then(res => {
    results = res.body
}).catch(err => {
    console.log(err)
})