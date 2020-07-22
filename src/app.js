const express = require('express');
require('dotenv').config();
const router = require('./routes/index.routes');
const app = express();


app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  }),
);
app.use('/images', express.static('public/uploaded-images'));

app.use('/api', router);

app.get('/homeadmin', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.send(req.user);
});


module.exports = app;
