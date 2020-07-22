require('dotenv').config();
const router = require('express').Router();
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');

// configuration de la boîte mail qui va envoyer les mails
const transporter = nodemailer.createTransport({
  service: ['Hotmail', 'Gmail'],
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

// configuration du transporter pour utiliser un template hbs
transporter.use(
  'compile',
  hbs({
    viewEngine: {
      extName: '.hbs',
      partialsDir: `${__dirname}/../templates`,
      layoutsDir: `${__dirname}/../templates`,
      defaultLayout: '',
    },
    viewPath: `${__dirname}/../templates`,
    extName: '.hbs',
  }),
);

router.post('/', (req, res) => {
  const {
    Nom, Prenom, Email, Comment,
  } = req.body;
  const subject = `Demande de la part: ${Nom} ${Prenom}`;

  const mailOptionsWithTemplate = {
    from: process.env.EMAIL,
    to: process.env.RECIPIENT_EMAIL,
    cc: Email,
    // bcc: 'reefeffefe',
    subject,
    template: 'contact',
    context: {
      nom: Nom,
      prenom: Prenom,
      email: Email,
      comment: Comment,
    },
  };
  transporter.sendMail(mailOptionsWithTemplate, (err, info) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json(info);
    }
  });
});

module.exports = router;
