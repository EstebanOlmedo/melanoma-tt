import User from '../../models/user.model';
import { Router } from 'express';
import reminderRouter from './reminder';
import "../../../config/passport"
const Crypto = require('crypto');

const userRouter = Router();
const passport = require('passport');


userRouter.use('/:idUser/reminder', reminderRouter);

userRouter.post('/', async (req, res, next) => {
  const body = req.body;
  const password = body.password;
  delete body.password;
  try {
    const user = User.build(body);
    const pass = createPassword(password);
    user.salt = pass.salt;
    user.hash = pass.hash;
    user.userName = user.userName.toLocaleLowerCase();
    user.save().then(user => {
      return res.status(201).json(toAuthJSON(user));
    }).catch(next);
  } catch (e) {
    next(e);
  }
});

userRouter.get('/', async (req, res, next) => {
  try {
    res.json(await User.findAll());
  } catch (e) {
    next(e);
  }
});

userRouter.get('/:idUser', async (req, res, next) => {
  const body = req.body;
  User.findOne({ where: { id: req.params.idUser } })
    .then(user => {
      if (!user) {
        return res.status(401).send(`The user ${req.params.idUser} wasn't found `);
      }
      const response = {
        username: user.userName,
        name: user.name,
        lastname: user.lastName,
        id: user.id,
        reminders: user.reminders,
      };
      return res.json(response);
    }).catch(next);
});

userRouter.patch('/:idUser', async (req, res, next) => {
  const body = req.body;
  if ('password' in body) {
    const pass = createPassword(body.password);
    delete body.password;
    body.hash = pass.hash;
    body.salt = pass.salt;
  }
  body.userName = body.userName.toLocaleLowerCase();
  User.update(body, { where: { id: req.params.idUser } })
    .then(() => {
      res.status(201).send(`The user ${req.params.idUser} was updated successfully`);
    }).catch(next);
});

userRouter.delete('/:idUser', async (req, res, next) => {
  const body = req.body;
  User.destroy({
    where: {
      id: req.params.idUser
    }
  }).then(user =>
    res.status(201).send(`The user ${req.params.idUser} was deleted successfully`));
});

userRouter.post('/login', async (req, res, next) => {
  const body = req.body;
  if (!req.body.userName) {
    return res.status(422).json({ error: 'The user is required' });
  }

  if (!req.body.password) {
    return res.status(422).json({ error: 'The password is required' });
  }

  passport.authenticate("local", { session: false }, function (err:Error, user:User, info) {
    if (err) {
      next(err); return;
    }

    if (user) {
      return res.json({ user: toAuthJSON(user) });
    } else {
      return res.status(422).json(info);
    }
  })(req, res, next);
});

const createPassword = function (password: string) {
  const salt = Crypto.randomBytes(16).toString('hex');
  const hash = Crypto
    .pbkdf2Sync(password, salt, 10000, 512, 'sha512')
    .toString('hex');
  return { salt, hash };
};

export const validatePassword = function (password: string, salt: string, hash: string) {
  const hashVerify = Crypto
    .pbkdf2Sync(password, salt, 10000, 512, 'sha512')
    .toString('hex');
  return hash === hashVerify;
};

export const toAuthJSON = function(user: User) {
  return {
    username: user.userName,
    id: user.id,
  };
};

export default userRouter;