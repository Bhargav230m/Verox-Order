async function Start(client) {
  const { loadEvents } = require("../Handlers/eventHandler");
  require("colors")
  const config = require("../config.json");
  loadEvents(client);
  console.log("[Prepairing]".green + " Prepairing to boot!");
  console.log(
    "Go ahead join my discord server https://discord.gg/mjY3hSYn4P"
  );
  client.login(config.Setup.Token).then(() => {
    console.table({
      guilds: client.guilds.cache.size,
      members: client.guilds.cache
        .map((c) => c.memberCount)
        .filter((v) => typeof v === "number")
        .reduce((a, b) => a + b, 0),
      ping: client.ws.ping + 2,
      ClientID: client.user.id,
      ClientTAG: client.user.tag,
      PoweredBy: "Bot Powered By Discord.js v14",
    });
  });
}
module.exports = { Start };
