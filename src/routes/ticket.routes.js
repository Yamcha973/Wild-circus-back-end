const router = require('express').Router();
const { connection } = require('../../connection');
const passport = require('../../helpers/passport');


//Afficher les tickets par catégories
router.get('/:id', (req, res) => {
  const idTicket = req.params.id;
  connection.query(
    'SELECT * FROM ticket WHERE id = ?',
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

// création d'un ticket
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  const formData = req.body;
  connection.query('INSERT INTO ticket SET ?', formData, (err, results) => {
    if (err) {
      res.status(500).send("Error when adding tickets");
    } else {
      connection.query('SELECT * FROM ticket WHERE id = ?', results.insertId, (errTwo, tickets) => {
        if (errTwo) {
          res.status(500).send('Error retrieving tickets');
        } else {
          res.status(201).json(tickets[0]);
        }
      });
    }
  });
});


// modification d'un ticket
router.put('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  const formData = req.body;
  const idTicket = req.params.id;
  connection.query('UPDATE ticket SET ? WHERE id = ?', [formData, idTicket], (err) => {
    if (err) {
      res.status(500).send('Error when modifying tickets');
      console.log(err.message);
    } else {
      res.sendStatus(200);
    }
  });
});

// suppression d'un ticket
router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  const idTicket = req.params.id;
  connection.query('DELETE FROM ticket WHERE id = ?', idTicket, (err) => {
    if (err) {
      res.status(500).send(`Error when deleting tickets : ${err.message}`);
    } else {
      res.sendStatus(200);
    }
  });
});


module.exports = router;
