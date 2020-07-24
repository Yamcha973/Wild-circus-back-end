const router = require('express').Router();
const { connection } = require('../../connection');


//Afficher les quantités de tickets par catégories
router.get('/:id', (req, res) => {
  const idTicket = req.params.id;
  connection.query(
    'SELECT tr.quantity FROM tr.ticket_reserve JOIN t.ticket ON t.id = tr.ticket_id JOIN r.reserve ON r.id = tr.reserve_id WHERE ticket_id = ?',
    idTicket,
    (err, results) => {
      if (err) {
        res.status(500).send('Error retrieving tickets');
      } else {
        res.status(200).json(results);
      }
    },
    );
});

router.get('/', (req, res) => {
  connection.query(
    'SELECT * FROM ticket',
    (err, results) => {
      if (err) {
        res.status(500).send('Error retrieving tickets');
      } else {
        res.status(200).json(results);
      }
    },
  );
});




module.exports = router;
