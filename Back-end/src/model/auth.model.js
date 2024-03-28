const project = require("./../database/project.config");

// login = async (nik, password) => await project
//   .select('user.id_user','user.nik', 'user.nama_user', 'user.password','user.group_id', 'userrole.role_id', 'userrole.name', 'userrole.keterangan', 'area.id_area', 'area.nama_area')
//   .from('user')
//   .leftJoin('userrole', 'user.role_id', 'userrole.role_id')
//   .leftJoin('area', 'user.id_area', 'area.id_area')
//   .where({ 'user.nik': nik, 'user.password': password });
login = async (nik) => await project
  .select('user.id_user','user.nik', 'user.nama_user', 'user.password','user.group_id', 'userrole.role_id', 'userrole.name', 'userrole.keterangan', 'area.id_area', 'area.nama_area', 'line.id_line')
  .from('user')
  .leftJoin('userrole', 'user.role_id', 'userrole.role_id')
  .leftJoin('area', 'user.id_area', 'area.id_area')
  .leftJoin('line', 'user.id_line', 'line.id_line')
  .where({ 'user.nik': nik});
  
module.exports = {
    login,
}
