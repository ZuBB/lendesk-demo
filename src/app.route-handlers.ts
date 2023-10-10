import { Request, Response } from 'express';
import { hashSync, genSaltSync, compareSync } from 'bcrypt';
import { isUsernameValid, isPasswordValid } from './app.service';
import { getRedisClient } from './app.storage';


export const registerHandler = (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!isUsernameValid(username)) {
    return res.status(400).json({ errorMessage: 'message' });
  }

  if (!isPasswordValid(password)) {
    return res.status(400).json({ errorMessage: 'message' });
  }

  const salt = genSaltSync(10);
  const hashedPassword = hashSync(password, salt);

  try {
    getRedisClient().hmset(username,
      'username', username,
      'password', hashedPassword,
      function (err: any, reply: any) {
        if (err) {
          console.log(err);
        }
        res.status(200).send({ statusMessage: `User '${username}' has been created`});
      });
  } catch (e) {
    console.log(e);
    res.sendStatus(400);
  }
};

export const loginHandler = (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    getRedisClient().hgetall(username, (err: any, obj: any) => {
      if (!obj) {
        return res.send({ message: "Invalid email" });
      }

      if (compareSync(password, obj.password)) {
        return res.send({ message: "Invalid  password" });
      }

      (req.session as any)['username'] = obj.username;
      // TODO
      return res.redirect('/home');
    });
  } catch (e) {
    console.log(e);
  }
};

export const logoutHandler = (req: Request, res: Response) => {
  req.session.destroy((err: any) => {
    if (err) {
      return res.redirect('/home')
    }

    res.clearCookie('process.env.SESS_NAME') // TODO
    res.redirect('/login')
  });
};
