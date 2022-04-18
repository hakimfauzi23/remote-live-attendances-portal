module.exports = (sequelize, Sequelize) => {
  const Setting = sequelize.define("setting", {
    name: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
    },
    value: {
      type: Sequelize.STRING,
    },
  });
  return Setting;
};
