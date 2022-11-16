const { User } = require('../models');
const { signToken } = require('../utils/auth');

module.exports = {
  async createUser(req, res) {
    try {
      const userData = await User.findOne({ email: req.body.email });

      if (userData) {
        res.status(400).json({ message: 'ERROR: User already exists!' });
        return;
      }
      await User.create(req.body);

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

      const token = signToken(userData);
      res
        .status(200)
        .json({ message: 'Logged In Successfully!', token, userData });
      return;
    } catch (err) {
      res.status(400).json(err);
    }
  },
};
