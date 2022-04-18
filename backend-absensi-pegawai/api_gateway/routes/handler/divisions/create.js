const apiAdapter = require("../../apiAdapter");

const { URL_EMPLOYEE_SERVICE } = process.env;
const api = apiAdapter(URL_EMPLOYEE_SERVICE);

module.exports = async (req, res) => {
  try {
    const division = await api.post("/api/divisions", req.body);
    return res.json(division.data);
  } catch (error) {
    if (error.code === "ECONNREFUSED") {
      return res.status(500).send(error);
    }

    const { status, data } = err.response;
    return res.status(status).json(data);
  }
};
