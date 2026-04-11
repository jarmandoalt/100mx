const Q100 = require("../db/SchemaQ100");

async function addQ100(req, res) {
  try {
    const { title, res1, valor1, res2, valor2, res3, valor3, res4, valor4, res5, valor5 } =
      req.body;

    const q100 = Q100({
      title,
      res1,
      valor1,
      res2,
      valor2,
      res3,
      valor3,
      res4,
      valor4,
      res5,
      valor5
    });


    const q100Stored = await q100.save();
    res.status(201).send({ q100Stored });
  } catch (e) {
    res.status(500).send({ message: e.message });
  }

}

async function getQ100(req, res) {
  const qt100 = await Q100.find().lean().exec();
  
  res.status(200).send({ qt100 });
}


module.exports = {
  addQ100,
  getQ100,
};
