const visitorModel = require("../../model/visitor.model");
const api = require("../../tools/common");


const getAllVisitors = async (req, res) => {
    try {
        const data = await visitorModel.getAll();
        return api.ok(res, data);
    } catch (error) {
        return api.error(res, "Internal Server Error", 500);
    }
};

const insertVisitor = async (req, res) => {
    try {
        const data = await visitorModel.insert(req.body);
        return api.ok(res, data);
    } catch (error) {
        return api.error(res, "Internal Server Error", 500);
    }
};

const updateVisitor = async (req, res) => {
    try {
        const data = await visitorModel.update(req.params.id, req.body);
        return api.ok(res, data);
    } catch (error) {
        return api.error(res, "Internal Server Error", 500);
    }
};

const deleteVisitor = async (req, res) => {
    if (!isNaN(req.params.id)) {
        try {
            const data = await visitorModel.deleteData(req.params.id);
            return api.ok(res, data);
        } catch (error) {
            return api.error(res, "Internal Server Error", 500);
        }
    } else {
        return api.error(res, "Bad Request", 400);
    }
};

module.exports = {
    getAllVisitors,
    insertVisitor,
    updateVisitor,
    deleteVisitor
};



// // Get all visitors
// exports.getAllVisitors = (req, res) => {
//     connection.query('SELECT * FROM visitor', (err, results) => {
//       if (err) return res.status(500).send(err);
//       res.json(results);
//     });
//   };
  
//   // Get visitor by ID
//   exports.getVisitorById = (req, res) => {
//     const { id } = req.params;
//     connection.query('SELECT * FROM visitor WHERE id = ?', [id], (err, results) => {
//       if (err) return res.status(500).send(err);
//       if (results.length === 0) return res.status(404).send('Visitor not found');
//       res.json(results[0]);
//     });
//   };
  
//   // Create new visitor
//   exports.createVisitor = (req, res) => {
//     const { date, nama_tamu, nama_vendor, id_card_hijau, id_card_merah, keperluan, pic, jam_masuk, jam_keluar } = req.body;
//     const query = 'INSERT INTO visitor (date, nama_tamu, nama_vendor, id_card_hijau, id_card_merah, keperluan, pic, jam_masuk, jam_keluar) VALUES (STR_TO_DATE(?, "%d/%m/%Y"), ?, ?, ?, ?, ?, ?, ?, ?)';
//     connection.query(query, [date, nama_tamu, nama_vendor, id_card_hijau, id_card_merah, keperluan, pic, jam_masuk, jam_keluar], (err, results) => {
//       if (err) return res.status(500).send(err);
//       res.status(201).send('Visitor created');
//     });
//   };
  
//   // Update visitor by ID
//   exports.updateVisitor = (req, res) => {
//     const { id } = req.params;
//     const { date, nama_tamu, nama_vendor, id_card_hijau, id_card_merah, keperluan, pic, jam_masuk, jam_keluar } = req.body;
//     const query = 'UPDATE visitor SET date = STR_TO_DATE(?, "%d/%m/%Y"), nama_tamu = ?, nama_vendor = ?, id_card_hijau = ?, id_card_merah = ?, keperluan = ?, pic = ?, jam_masuk = ?, jam_keluar = ? WHERE id = ?';
//     connection.query(query, [date, nama_tamu, nama_vendor, id_card_hijau, id_card_merah, keperluan, pic, jam_masuk, jam_keluar, id], (err, results) => {
//       if (err) return res.status(500).send(err);
//       res.send('Visitor updated');
//     });
//   };
  
//   // Delete visitor by ID
//   exports.deleteVisitor = (req, res) => {
//     const { id } = req.params;
//     connection.query('DELETE FROM visitor WHERE id = ?', [id], (err, results) => {
//       if (err) return res.status(500).send(err);
//       res.send('Visitor deleted');
//     });
//   };

//   module.exports = {
//     getAllVisitors,
//     getVisitorById,
//     createVisitor,
//     updateVisitor,
//     deleteVisitor
//   };
  