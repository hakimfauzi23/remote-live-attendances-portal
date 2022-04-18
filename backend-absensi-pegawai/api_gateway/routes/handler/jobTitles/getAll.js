const apiAdapter = require("../../apiAdapter");
const { URL_EMPLOYEE_SERVICE } = process.env;

const api = apiAdapter(URL_EMPLOYEE_SERVICE);

module.exports = async (req, res) => {
  try {
    const jobTitles = await api.get(`/api/job-titles`);
    return res.json(jobTitles.data);
  } catch (err) {
    if (err.code === "ECONNREFUSED") {
      return res.status(500).send(err);
    }

    const { status, data } = err.response;
    return res.status(status).json(data);
  }
};
