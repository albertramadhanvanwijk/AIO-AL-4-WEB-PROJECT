const model = require("../../model/approval.model");
const api = require("../../tools/common");

// Controller untuk menyetujui bagian
const approvePart = async (req, res) => {
    const { partNumber, descriptionType, approvedBy, approvalComment } = req.body;
  
    try {
      // Simpan data persetujuan ke dalam database
      const approval = await model.create({
        partNumber,
        descriptionType,
        approvedBy,
        approvalStatus: 'Approved',
        approvalComment
      });
  
      // Kirim respon berhasil
      return api.ok(res, { message: 'Part approved successfully', data: approval });
    } catch (error) {
      // Tangani kesalahan jika terjadi
      console.error('Failed to approve part:', error);
      return api.error(res, 'Internal server error');
    }
  };
  
  // Controller untuk menolak bagian
  const rejectPart = async (req, res) => {
    const { partNumber, descriptionType, approvedBy, approvalComment } = req.body;
  
    try {
      // Simpan data penolakan ke dalam database
      const rejection = await model.create({
        partNumber,
        descriptionType,
        approvedBy,
        approvalStatus: 'Rejected',
        approvalComment
      });
  
      // Kirim respon berhasil
      return api.ok(res, { message: 'Part rejected successfully', data: rejection });
    } catch (error) {
      // Tangani kesalahan jika terjadi
      console.error('Failed to reject part:', error);
      return api.error(res, 'Internal server error');
    }
  };
  
  module.exports = {
    approvePart,
    rejectPart
  };