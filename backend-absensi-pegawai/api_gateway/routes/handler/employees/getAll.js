const apiAdapter = require("../../apiAdapter");
const { URL_EMPLOYEE_SERVICE } = process.env;

const api = apiAdapter(URL_EMPLOYEE_SERVICE);

module.exports = async (req, res) => {
  try {
    let extUrl = "";
    if (req.query.name) {
      extUrl = `?name=${req.query.name}`;
    }
    const employees = await api.get(`/api/employees${extUrl}`);
    return res.json(employees.data);
  } catch (err) {
    if (err.code === "ECONNREFUSED") {
      return res.status(500).send(err);
    }

    const { status, data } = err.response;
    return res.status(status).json(data);
  }
};
