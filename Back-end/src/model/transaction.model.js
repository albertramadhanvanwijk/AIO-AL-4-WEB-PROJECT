const project = require('./../database/project.config');

const getAll = async () => await project.select('*').from('transaction');

const getById = async (id) => await project.select('*').from('transaction').where('id_transaction', id);

const insert = async (data) => await project('transaction').insert(data);

const update = async (id, data) => await project('transaction').where('id_transaction', id).update(data);

const deleteData = async (id) => await project('transaction').where('id_transaction', id).del();

const getTransactionsBySupplyId = async (id) => await project.raw(`
  SELECT
    t.id_transaction,
    s.nama_supply AS id_supply,  
    CASE
      WHEN t.id_category = 1 THEN 'Masuk'  
      WHEN t.id_category = 2 THEN 'Keluar'  
      ELSE 'Tipe Lainnya'  
    END AS tipe_category,  
    t.tanggal,
    t.resv_date, 
    u.nama_user AS id_user,  
    t.jumlah,
    a.nama_area AS id_area, 
    t.description 
  FROM transaction AS t
  INNER JOIN supply AS s ON t.id_supply = s.id_supply
  INNER JOIN user AS u ON t.id_user = u.id_user
  INNER JOIN area AS a ON t.id_area = a.id_area
  WHERE t.id_supply = ?;
`, [id]);


const getTransaction = async () => {
  return await project.raw(`
    SELECT
      t.id_transaction,
      s.nama_supply,
      c.nama_category,
      t.tanggal,
      t.resv_date,
      u.nama_user,
      t.jumlah,
      a.nama_area
    FROM transaction AS t
    INNER JOIN supply AS s ON t.id_supply = s.id_supply
    INNER JOIN category AS c ON t.id_category = c.id_category
    INNER JOIN user AS u ON t.id_user = u.id_user
    INNER JOIN area AS a ON t.id_area = a.id_area;
  `);
};

const getChartDataIBF = async (month, year) => {
  return await project.raw(`
  SELECT
  YEAR(tanggal) AS tahun,
  MONTH(tanggal) AS bulan,
  s.nama_supply AS item,
  a.nama_area AS area,
  SUM(t.jumlah) AS jumlah_out
  FROM transaction t
  JOIN supply s ON t.id_supply = s.id_supply AND s.is_deleted = 0
  JOIN area a ON t.id_area = a.id_area
  WHERE t.id_area = 1 AND t.id_category = 2
  AND YEAR(tanggal) = "${year}" AND MONTH(tanggal) = "${month}"
  GROUP BY tahun, bulan, item, area
  ORDER BY tahun DESC, bulan ASC, area, item;
  `);
};


const getChartDataPREPARASI = async (month, year) => {
  return await project.raw(`
  SELECT
  YEAR(tanggal) AS tahun,
  MONTH(tanggal) AS bulan,
  s.nama_supply AS item,
  a.nama_area AS area,
  SUM(t.jumlah) AS jumlah_out
  FROM transaction t
  JOIN supply s ON t.id_supply = s.id_supply AND s.is_deleted = 0
  JOIN area a ON t.id_area = a.id_area
  WHERE t.id_area = 2 AND t.id_category = 2
  AND YEAR(tanggal) = "${year}" AND MONTH(tanggal) = "${month}"
  GROUP BY tahun, bulan, item, area
  ORDER BY tahun DESC, bulan ASC, area, item;
  `);
};

const getChartDataPACKING = async (month, year) => {
  return await project.raw(`
  SELECT
  YEAR(tanggal) AS tahun,
  MONTH(tanggal) AS bulan,
  s.nama_supply AS item,
  a.nama_area AS area,
  SUM(t.jumlah) AS jumlah_out
  FROM transaction t
  JOIN supply s ON t.id_supply = s.id_supply AND s.is_deleted = 0
  JOIN area a ON t.id_area = a.id_area
  WHERE t.id_area = 3 AND t.id_category = 2
  AND YEAR(tanggal) = "${year}" AND MONTH(tanggal) = "${month}"
  GROUP BY tahun, bulan, item, area
  ORDER BY tahun DESC, bulan ASC, area, item;

  `);
};
module.exports = {
  getAll,
  getById,
  insert,
  update,
  deleteData,
  getTransaction,
  getTransactionsBySupplyId,
  getChartDataIBF,
  getChartDataPREPARASI,
  getChartDataPACKING,
};
