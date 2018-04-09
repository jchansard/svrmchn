let router = require('express').Router()
let users = ["glasg0wn3d", "foxyMoron", "OXXBOW", "online_playing", "chimichanga420", "LEFT4SCRAPS"]
const logger = require('../../logger')("Authenticate API");
// TODO relearn this

/* POST */
router.post('/', (req, res) => {
  let userName = req.body.userName;
  if (users.includes(userName)) {
    users = users.filter((user) => user !== userName);
    logger.debug(`User ${userName} is logging in.`);
    res.status(200).json({
      user: userName,
      token: "t3St1ng"
    })
  } else {
    logger.error(`${userName} is already logged in!`);
    res.status(418).send("Already logged in");
  }
});

module.exports = router;
