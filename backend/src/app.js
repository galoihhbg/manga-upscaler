const express = require('express');

const app = express();

const route = require('./routes/index');

const cors = require('cors')

//Add middleware

app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.use('/input', express.static('src/ESRGAN/input'));
app.use('/output', express.static('src/ESRGAN/output'));


route(app)

app.listen(10000, () => {
  console.log('Server runs at port 10000');
});
