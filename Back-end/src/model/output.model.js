const project = require('./../database/project.config');

const getAll = async () => await project
    .select('*')
    .from('output_part')

const getByOutputId = async (outputpart_id) => await project
    .select('*')
    .from('output_part')
    .where('outputpart_id', '=', outputpart_id)

const getByIdPart = async (partId) => await project
    .select('*')
    .from('output_part')
    .where('part_id', '=', partId)

const insert = async (data) => await project('output_part').insert(data)

const update = async (outputpart_id, data) => await project('output_part').where('outputpart_id', '=', outputpart_id).update(data)

const softDelete = async (outputpart_id, data) => await project('output_part').where('outputpart_id', '=', outputpart_id).update(data)

const totalOutByIdPart = async (partId) => {
    const result = await project('output_part')
      .select(project.raw('SUM(stock_out) as total_remainOut'))
      .where({ part_id: partId, is_deleted: 0 })
      .first(); // Menggunakan first() untuk mengambil satu hasil
  
    // Mengakses properti total_remain
    return result ? result.total_remainOut : 0; // Mengembalikan 0 jika tidak ada hasil
  }
const totalInByIdPart = async (partId) => {
    const result = await project('output_part')
      .select(project.raw('SUM(stock_in) as total_remainIn'))
      .where({ part_id: partId, is_deleted: 0 })
      .first(); // Menggunakan first() untuk mengambil satu hasil
  
    // Mengakses properti total_remain
    return result ? result.total_remainIn : 0; // Mengembalikan 0 jika tidak ada hasil
  }

const getDetailOutput = async (partId) => await project
  .select(
    'o.outputpart_id', 'o.part_id','o.id_category', 'o.stock_in','o.stock_out', 'o.id_user', 'o.is_deleted', 'o.created_at', 'o.updated_at','o.keterangan','p.part_id', 'p.id_area', 'p.part_number', 'p.description', 'p.qty_stock', 'p.price', 'a.id_area', 'a.nama_area', 'u.id_user', 'u.nama_user'
  )
  .from('output_part as o')
  .join('parts as p', 'p.part_id', 'o.part_id' )
  .join('area as a', 'a.id_area', 'p.id_area')
  .join('user as u', 'u.id_user', 'o.id_user')
  .where('o.part_id', partId)
  .andWhere('o.is_deleted', 0)

  const totalPrice = async (areaId) => await project
    .select(project.raw('SUM(price * qty_stock) as total_price'))
    .from('parts')
    .where('is_deleted', 0)
    .andWhere('id_area', areaId)

module.exports = {
    getAll,
    getByIdPart,
    getByOutputId,
    insert,
    update,
    softDelete,
    totalOutByIdPart,
    totalInByIdPart,
    getDetailOutput,
    totalPrice,
}