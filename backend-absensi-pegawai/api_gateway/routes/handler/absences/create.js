const apiAdapter = require("../../apiAdapter");

const { URL_ABSENCE_SERVICE } = process.env;
const api = apiAdapter(URL_ABSENCE_SERVICE);

module.exports = async (req, res) => {
  try {
    const absence = await api.post("/api/absences", req.body);
    return res.json(absence.data);
  } catch (error) {
    if (err.code === "ECONNREFUSED") {
      return res.status(500).send(err);
    }

    const { status, data } = err.response;
    return res.status(status).json(data);
  }
};
