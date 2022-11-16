const { User } = require('../models');

module.exports = {
  async createUser(req, res) {
    try {
      const userData = await User.findOne({ email: req.body.email });

      if (userData) {
        res.status(400).json({ message: 'ERROR: User already exists!' });
        return;
      }

      if (req.session.logged_in && req.session.isOwner) {
        await User.create({
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          isOwner: false,
          owner_id: req.session.user_id,
        });
      } else {
        await User.create(req.body);
      }

      res.status(200).json({ message: 'User Created Successfully!' });
    } catch (err) {
      res.status(401).json(err);
    }
  },
  async login(req, res) {
    try {
      const userData = await User.findOne({ email: req.body.email });
      if (!userData) {
        res
          .status(400)
          .json({ message: 'Incorrect email or password, please try again' });
        return;
      }

      const validPassword = await userData.checkPassword(req.body.password);

      if (!validPassword) {
        res
          .status(400)
          .json({ message: 'Incorrect email or password, please try again' });
        return;
      }

      req.session.save(() => {
        req.session.user_id = userData._id;
        req.session.logged_in = true;
        req.session.user_name = userData.username;
        req.session.isOwner = userData.isOwner;

        res.json({ user: userData, message: 'You are now logged in!' });
      });
    } catch (err) {
      res.status(400).json(err);
    }
  },
  logout(req, res) {
    if (req.session.logged_in) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
  },
  getLoggedInStatus(req, res) {
    if (req.session.logged_in) {
      res.status(204).json({ message: 'User is logged in!' });
    } else {
      res.status(404).json({ message: 'User is not logged in!' });
    }
  },
  getOwnerStatus(req, res) {
    if (req.session.isOwner) {
      res.status(204).json({ message: 'User is Owner!' });
    } else {
      res.status(404).json({ message: 'User is not Owner!' });
    }
  },
};
