const AuthSchema = require("../models/auth");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
  try {
    const { username, password, email } = req.body;

    const user = await AuthSchema.findOne(email);
    if (user) {
      return res
        .status(500)
        .json({ message: "Böyle bir kullanıcı zaten var!!" });
    }
    if (password.length < 6) {
      return res
        .status(500)
        .json({ message: "Şifreniz 6 karakterden küçük olmalıdır" });
    }

    const passwordHash = await bcrypt.hash(password, 12);

    // if(){

    // }
    
  } catch (error) {}
};

const login = async (req, res) => {
  try {
  } catch (error) {}
};

module.exports = { register, login };
