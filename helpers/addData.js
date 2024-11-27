const db = require("./db");

async function addData(id, data) {
  // Membuat Collection root-level
  const predictions = db.collection("predictions");

  // Menambahkan data prediksi ke 'predictions' collection
  await predictions.doc(id).set(data);
}

module.exports = addData;
