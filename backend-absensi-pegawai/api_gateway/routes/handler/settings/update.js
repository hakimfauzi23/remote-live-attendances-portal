const apiAdapter = require("../../apiAdapter");
const { URL_SETTING_SERVICE } = process.env;

const api = apiAdapter(URL_SETTING_SERVICE);

module.exports = async (req, res) => {
  try {
    const id = req.params.id;
    const setting = await api.put(`/api/settings/${id}`, req.body);
    return res.json(setting.data);
  } catch (error) {
    if (error.code === "ECONNREFUSED") {
      return res.status(500).send(error);
    }

    const { status, data } = error.response;
    return res.status(status).json(data);
  }
};
