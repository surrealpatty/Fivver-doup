module.exports = {
  development: {
    username: "root",  // replace with your MySQL username
    password: "yourpassword",  // replace with your MySQL password
    database: "fivver_doup",  // replace with your database name
    host: "localhost",
    dialect: "mysql"
  },
  test: {
    username: "root",  // same for test environment
    password: "yourpassword",  // ensure correct password
    database: "fivver_doup_test",  // test database (if separate)
    host: "localhost",
    dialect: "mysql"
  }
};
