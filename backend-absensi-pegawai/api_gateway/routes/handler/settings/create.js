const apiAdapter = require("../../apiAdapter");

const { URL_SETTING_SERVICE } = process.env;

const api = apiAdapter(URL_SETTING_SERVICE);

module.exports = async (req, res) => {
  try {
    const setting = await api.post("/api/settings", req.body);
    return res.json(setting.data);
  } catch (err) {
    if (err.code === "ECONNREFUSED") {
      return res.status(500).send(err);
    }

    const { status, data } = err.response;
    return res.status(status).json(data);
  }
};
