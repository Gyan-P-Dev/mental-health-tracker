
const express = require('express');
const db = require('../db');
const io  = require('../index');
const router = express.Router();

// POST log
router.post('/log', (req, res) => {
  const { name, email, mood, anxiety, sleepHours, activityType, socialFrequency, stress, symptoms } = req.body;
  let sleep=sleepHours
  let activity=activityType
  let social = socialFrequency
  const date = new Date().toISOString().split('T')[0];

  db.get('SELECT email FROM users WHERE email = ?', [email], (err, row) => {
    if (err) { return res.status(500).send({ error: err.message })}
    console.log(
        "row===",row
    );
    if (!row) {
      db.run('INSERT INTO users (name, email) VALUES (?, ?)', [name, email], function (err) {
        if (err) {
          return res.status(500).send({ error: err.message });
        }

        let result = insertLog(mood, anxiety, sleep, activity, social, stress, symptoms, date, email);
        if(!result){return res.status(500).send({ message: 'Something went wrong' })}
        io.io.emit('user-logs', {
          name,
          email,
          mood,
          anxiety,
          sleep,
          activity,
          social,
          stress,
          symptoms,
          date,
        });        return res.status(200).send({ message: 'Logs created' });
    });
    } else {
        let result = insertLog(mood, anxiety, sleep, activity, social, stress, symptoms, date, email);
        if(!result){return res.status(500).send({ message: 'Something went wrong' })}
        io.io.emit('user-logs', {
          name,
          email,
          mood,
          anxiety,
          sleep,
          activity,
          social,
          stress,
          symptoms,
          date,
        });        return res.status(200).send({ message: 'Logs created' });
    }
  });
});

function insertLog( mood, anxiety, sleep, activity, social, stress, symptoms, date, email) {
  db.run(
    `INSERT INTO logs (mood, anxiety, sleep, activity, social, stress, symptoms, date, email) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [mood, anxiety, sleep, activity, social, stress, symptoms, date, email],
    function (err) {
      if (err) { return false }
    });
  return true
}


router.get('/logs', (req, res) => {
  const { email } = req.query;

  if (!email) {
    return res.status(400).send('Email query parameter is required');
  }

  db.all(`SELECT * FROM logs WHERE email = ?`, [email], (err, rows) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    // If logs exist for the email, return them
    if (rows.length > 0) {
     
      return res.status(200).send(rows);
    } else {
      return res.status(404).send('No logs found for this email');
    }
  });
});

module.exports = router;
