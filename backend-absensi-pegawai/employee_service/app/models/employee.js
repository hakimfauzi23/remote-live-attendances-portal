module.exports = (sequelize, Sqlize) => {
  const Employee = sequelize.define("employee", {
    name: {
      type: Sqlize.STRING,
    },
    address: {
      type: Sqlize.STRING,
    },
    pob: {
      type: Sqlize.STRING,
    },
    dob: {
      type: Sqlize.DATEONLY,
    },
    phone_number: {
      type: Sqlize.STRING(20),
    },
    email: {
      type: Sqlize.STRING,
    },
    avatar: { type: Sqlize.STRING, allowNull: true },
  });
  return Employee;
};
