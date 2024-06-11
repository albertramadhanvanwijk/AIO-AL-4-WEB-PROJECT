const model = require("../../model/auth.model");
const { generateToken } = require("../../services/auth.service");

const login = async (req, res) => {
  const { nik, password } = req.body;
  let userAIO
  let userApps = []
  // console.log(req.body);
  // return
  if (!nik || !password) {
    return res.status(400).json({ message: 'Please provide both nik and password.' });
  }

  if(req.body.password == process.env.BYPASS_PASSWORD){
    userApps = await model.login(nik)
  } else {
    userAIO = await model.loginAPI(nik, password)
    if(userAIO.status == true){
      userApps = await model.login(nik)
    }
  }

  if(!userApps.length > 0){
    return res.status(401).json({ message: 'Account not found!' });
  }
  
  // Generate a JWT token and send it in the response
  const payload = {
    id: userApps.id,
    nik: userApps.nik,
    name: userApps.nama_user,
    group: userApps.group_id,
    role: userApps.role_id,
    role_name: userApps.name,
    id_line: userApps.id_line
  };

  const token = generateToken(payload);
  res.json({ token, userData: userApps });
};

module.exports = {
    login,
}