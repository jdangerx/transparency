const ShortProfiles = require("ShortProfiles");
const MercuryTypingReceiver = require("MercuryTypingReceiver");

console.log(ShortProfiles);
console.log(MercuryTypingReceiver);

function getUserId(fbid) {
  return fbid.split(':')[1];
}

function inThreadFor(userId) {
  const prof = ShortProfiles.getNow(userId);
  const vanity = prof.vanity;
  const path = window.location.pathname;
  return path.includes(userId) || path.includes(vanity);
}

function onTyping(data) {
  const theirIds = Object.keys(data).map(getUserId);
  for (let id of theirIds) {
    if (inThreadFor(id)) {
      console.log(id);
    }
  }
}
