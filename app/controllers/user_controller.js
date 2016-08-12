import jwt from 'jwt-simple';
import config from '../config.js';
import User from '../models/user_model';


// encodes a new token for a user object
function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}


export const signin = (req, res, next) => {
  res.send({ token: tokenForUser(req.user) });
};

export const signup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const username = req.body.username;

  if (!email || !password || !username) {
    console.log(email, password);
    return res.status(422).send('You must provide username, email, and password');
  }

  User.findOne({ email: req.body.email })
  .then(newuser => {
    if (!newuser) {
      const user = new User();
      user.email = req.body.email;
      user.password = req.body.password;
      user.username = req.body.username;

      user.save()
      .then(result => {
        res.json({ token: tokenForUser(user), message: 'User created!' });
      })
      .catch(error => {
        res.json({ error });
      });
    } else {
      return res.status(422).send('This email is already set up');
    }
  })
  .catch(error => {
    res.json({ error });
  });
};
