const project = require("./../database/project.config");
const axios = require('axios');
const https = require('https');

const loginAPI = async (username, password) => {
  let res = await axios.post(process.env.AUTH_URL, {username, password}, {httpsAgent: new https.Agent({ rejectUnauthorized: false })});
  if(res.status) {
    return res.data
  } else {
    return false;
  }
}

const login = async (nik) => await project
  .select('user.id_user','user.nik', 'user.nama_user', 'user.password','user.group_id', 'userrole.role_id', 'userrole.name', 'userrole.keterangan', 'area.id_area', 'area.nama_area', 'line.id_line')
  .from('user')
  .leftJoin('userrole', 'user.role_id', 'userrole.role_id')
  .leftJoin('area', 'user.id_area', 'area.id_area')
  .leftJoin('line', 'user.id_line', 'line.id_line')
  .where({ 'user.nik': nik})
  
module.exports = {
    login,
    loginAPI
}
