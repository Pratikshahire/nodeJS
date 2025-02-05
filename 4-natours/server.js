const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const app = require('./app');

// console.log(process.env);
// console.log(process.env.NODE_ENV);


console.log(app.get('env'));
const port = process.env.PORT;

app.listen(port, () => {
  console.log(`App is listening at port ${port}`);
});
