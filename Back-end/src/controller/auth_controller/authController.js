const model = require("../../model/auth.model");
const { generateToken } = require("../../services/auth.service");

const login = async (req, res) => {
  const { nik, password } = req.body;

  if (!nik || !password) {
    return res.status(400).json({ message: 'Please provide both nik and password.' });
  }

  let user = await model.login(nik, password);
  if(!user.length > 0){
    return res.status(401).json({ message: 'Account not found!' });
  }

  // Generate a JWT token and send it in the response
  const payload = {
    id: user.id,
    nik: user.nik,
    name: user.nama_user,
    group: user.group_id,
    role: user.role_id,
    role_name: user.name,
    id_line: user.id_line
  };

  const token = generateToken(payload);
  res.json({ token, userData: user });
};

module.exports = {
    login,
}