const router = require('express').Router();
const performancesRouter = require('./performance.routes');
const aboutRouter = require('./about.routes');
const contactRouter = require('./contact.routes');
const ticketsRouter = require('./ticket.routes');



router.use('/performance', performancesRouter);
router.use('/about', aboutRouter);
router.use('/contact', contactRouter);
router.use('/ticket', ticketsRouter);



module.exports = router;
