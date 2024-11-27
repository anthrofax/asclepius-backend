const tf = require("@tensorflow/tfjs-node");

async function predictClassification(model, image) {
  console.log("Inference baru dimulai");
  const tensor = tf.node
    .decodeJpeg(image.buffer)
    .resizeNearestNeighbor([224, 224])
    .expandDims()
    .toFloat();

  const prediction = model.predict(tensor);
  const score = await prediction.data();

  let result, suggestion;
  if (score > 0.5) {
    result = "Cancer";
    suggestion = "Segera periksa ke dokter!";
  } else {
    result = "Non-cancer";
    suggestion = "Penyakit kanker tidak terdeteksi.";
  }

  return { result, suggestion };
}

module.exports = predictClassification;
