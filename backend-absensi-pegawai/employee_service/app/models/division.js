module.exports = (sequelize, Sqlize) => {
  const Divison = sequelize.define("division", {
    title: {
      type: Sqlize.STRING,
    },
    description: {
      type: Sqlize.STRING,
    },
  });
  return Divison;
};
