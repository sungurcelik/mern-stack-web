const AuthSchema = require("../models/auth");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// KAYIT OLMA İŞLEMLERİ
const register = async (req, res) => {
  try {
    const { username, password, email } = req.body;

    // ZATEN KAYITLI MI KONTROLÜ
    const user = await AuthSchema.findOne(email);
    if (user) {
      return res
        .status(500)
        .json({ message: "Böyle bir kullanıcı zaten var!!" });
    }
    // ŞİFRE UYGUNLUK KONTROLÜ
    if (password.length < 6) {
      return res
        .status(500)
        .json({ message: "Şifreniz 6 karakterden küçük olmalıdır" });
    }

    // ŞİFRE HASHLEME                                                             HASHLEME
    const passwordHash = await bcrypt.hash(password, 12);

    if (!isEmail(email)) {
      return res
        .status(500)
        .json({ message: "Email formatı dışında bir şeyler girdiniz!!" });
    }

    // KULLANICI KAYDETME                                                             KAYIT İŞLEMİ
    const newUser = await AuthSchema.create({
      username,
      email,
      password: passwordHash,
    });

    // JSON WEB TOKEN                                                            JWT
    const token = jwt.sign({ id: newUser._id }, "SECRET_KEY", {
      expiresIn: "1h",
    });
    res.status(201).json({
      status: "OK",
      newUser,
      token,
    });

    // HATA KISMI                                                            HATA
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// GİRİŞ İŞLEMLERİ
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // ZATEN KAYITLI MI                                                              KAYIT KONTROL
    const user = await AuthSchema.findOne(email);
    if (!user) {
      return res
        .status(500)
        .json({ message: "Böyle bir kullanıcı bulunamadı." });
    }

    // ŞİFRE KARŞILAŞTIRMA                                                             ŞİFRE COMPARE
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      return res.status(500).json({ message: "Girilen şifre yanlış!!" });
    }

    // JSON WEB TOKEN                                                            JWT
    const token = jwt.sign({ id: user._id }, "SECRET_KEY", {
      expiresIn: "1h",
    });

    // GERİ BİLDİRİM                                                            STATUS
    res.status(200).json({
      status: "OK",
      user,
      token,
    });
    // HATA KISMI                                                            HATA
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// EMAİL REGEX                                                             EMAIL REGEX
function isEmail(emailAdress) {
  let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (emailAdress.match(regex)) {
    return true;
  } else {
    return false;
  }
}

module.exports = { register, login };
