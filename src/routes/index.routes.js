const router = require('express').Router();
const cors = require('cors');
const authRouter = require('./auth.routes');
// const pictureRouter = require('./picture.routes');
const contactRouter = require('./contact.routes');
const ticketRouter = require('./ticket.routes');
// const reserveRouter = require('./reserve.routes');
const quantityRouter = require('./quantity.routes');


const ALLOWED_ORIGINS = process.env.CLIENT_APP_ORIGIN.split(',');

const corsOptions = {
  origin: ALLOWED_ORIGINS,
};

router.use(cors(corsOptions));
router.use('/auth', authRouter);
// router.use('/picture', pictureRouter);
router.use('/contact', contactRouter);
router.use('/ticket', ticketRouter);
// router.use('/reserve', reserveRouter);
router.use('/quantity', quantityRouter);



module.exports = router;
