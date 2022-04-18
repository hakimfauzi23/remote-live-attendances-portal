const apiAdapter = require("../../apiAdapter");
const { URL_ABSENCE_SERVICE } = process.env;

const api = apiAdapter(URL_ABSENCE_SERVICE);

module.exports = async (req, res) => {
  try {
    console.log(req.query);
    const absences = await api.get(`/api/absences/employee`, {
      params: {
        month: req.query.month,
        year: req.query.year,
        employee_id: req.query.employee_id,
        page: req.query.page,
        size: req.query.size,
      },
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
