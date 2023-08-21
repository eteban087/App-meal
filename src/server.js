const dotenv = require('dotenv').config();
const { app } = require('./app');
const { db } = require('./database/config');
const { initModel } = require('./models/initModel');

db.authenticate()
  .then(() => console.log('database conected...😃'))
  .catch((err) => console.log(err));

initModel();

db.sync({ force: false })
  .then(() => console.log('database sincronized 🥇'))
  .catch((err) => console.log(err));

const PORT = +process.env.PORT || 3000;
console.log(process.env.NODE_ENV);
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
