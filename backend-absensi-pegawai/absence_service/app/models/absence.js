module.exports = (sequelize, Sqlize) => {
  const Absence = sequelize.define(
    "absence",
    {
      employee_id: Sqlize.INTEGER,
      date: Sqlize.DATEONLY,
      clock_in: Sqlize.TIME,
      clock_out: Sqlize.TIME,
      report: { type: Sqlize.STRING, allowNull: true },
      loc_in: Sqlize.STRING,
      loc_out: Sqlize.STRING,
    },
    {
      timestamps: false,
      indexes: [{ unique: false, fields: ["employee_id"] }],
    }
  );

  return Absence;
};
