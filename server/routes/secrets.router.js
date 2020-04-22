const express = require('express');
const {rejectUnauthenticated} = require ('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require( '../strategies/user.strategy');

const router = express.Router();

router.get('/', rejectUnauthenticated, (req, res) => {
    console.log('req.user:', req.user.clearance_level);
    
    let param = req.user.clearance_level;
    
    pool.query('SELECT * FROM "secret" WHERE secrecy_level < $1;', [param])
        .then(results => res.send(results.rows))
        .catch(error => {
            console.log('Error making SELECT for secrets:', error);
            res.sendStatus(500);
        });
});


// clear all server session information about this user
router.post('/logout', (req, res) => {
    // Use passport's built-in method to log out the user
    req.logout();
    res.sendStatus(200);
});

module.exports = router;







module.exports = router;