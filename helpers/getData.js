const db = require("./db");

async function getData() {
  const snapshot = await db.collection("predictions").get();

  return snapshot.docs.map(doc => doc.data());
}

module.exports = getData;