const { User } = require("../models");

module.exports = {
  async createUser(req, res) {
    try {
      const userData = await User.findOne({ where: { email: req.body.email } });

      if (userData) {
        res.status(400).json({ message: "ERROR: User already exists!" });
        return;
      }

      await User.create(req.body, {
        individualHooks: true,
        returning: true,
      });
    } catch (err) {
      res.status(401).json(err);
    }
  },
  async login(req, res) {
    try {
      const userData = await User.findOne({ where: { email: req.body.email } });

      if (!userData) {
        res
          .status(400)
          .json({ message: "Incorrect email or password, please try again" });
        return;
      }

      const validPassword = await userData.checkPassword(req.body.password);

      if (!validPassword) {
        res
          .status(400)
          .json({ message: "Incorrect email or password, please try again" });
        return;
      }

      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.logged_in = true;
        req.session.user_name = userData.username;

        res.json({ user: userData, message: "You are now logged in!" });
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
};
