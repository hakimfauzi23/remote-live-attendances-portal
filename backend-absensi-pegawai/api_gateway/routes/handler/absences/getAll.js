const apiAdapter = require("../../apiAdapter");
const { URL_ABSENCE_SERVICE } = process.env;

const api = apiAdapter(URL_ABSENCE_SERVICE);

module.exports = async (req, res) => {
  try {
    const absences = await api.get(`/api/absences`, {
      params: { month: req.query.month, year: req.query.year },
    });
    return res.json(absences.data);
  } catch (err) {
    if (err.code === "ECONNREFUSED") {
      return res.status(500).send(err);
    }

    const { status, data } = err.response;
    return res.status(status).json(data);
  }
};
