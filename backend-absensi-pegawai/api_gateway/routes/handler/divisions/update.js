const apiAdapter = require("../../apiAdapter");
const { URL_EMPLOYEE_SERVICE } = process.env;

const api = apiAdapter(URL_EMPLOYEE_SERVICE);

module.exports = async (req, res) => {
  try {
    const id = req.params.id;
    const division = await api.put(`/api/divisions/${id}`, req.body);
    return res.json(division.data);
  } catch (error) {
    if (error.code === "ECONNREFUSED") {
      return res.status(500).send(error);
    }

    const { status, data } = error.response;
    return res.status(status).json(data);
  }
};
