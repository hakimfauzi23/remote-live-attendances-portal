module.exports = (sequelize, Sqlize) => {
  const JobTitle = sequelize.define("job_title", {
    title: {
      type: Sqlize.STRING,
    },
    description: {
      type: Sqlize.STRING,
    },
  });
  return JobTitle;
};
