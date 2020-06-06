const User = require("../model/User");

exports.registerNewUser = async (req, res) => {
  try {
    const user = new User({
      uuid: req.body.uuid,
      password: req.body.password,
    });

    let data = await user.save();

    const token = await user.generateAuthToken(); // here it is calling the method that we created in the model

    res.status(201).json({ data, token });
  } catch (err) {
    res.status(400).json({ err: err });
  }
};
exports.loginUser = async (req, res) => {
  try {
    // console.log(req.body);
    const uuid = req.body.uuid;
    const password = req.body.password;
    const user = await User.findByCredentials(uuid, password);
    if (!user) {
      return res
        .status(401)
        .json({ error: "Login failed! Check authentication credentials" });
    }
    const token = await user.generateAuthToken();
    res.status(201).json({ user, token });
  } catch (err) {
    res.status(400).json({ err: err });
  }
};
exports.getUserDetails = async (req, res) => {
  await res.json(req.userData);
};
