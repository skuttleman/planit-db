try {
  require('dotenv').load();
} catch(error) {
  console.error(error);
}
module.exports = {
  development: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  },
  production: {
    client: 'pg',
    connection: process.env.PRODUCTION_DB_URL
  }
};
