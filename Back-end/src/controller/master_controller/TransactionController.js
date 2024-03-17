const transactionModel = require("../../model/transaction.model");
const api = require("../../tools/common");
const supplyModel = require("../../model/supply.model");


updateStock = async (id_supply, id_category, jumlah) => {
    const supply = await supplyModel.getByIdtransaction(id_supply);
  
    if (id_category === 1) { 
      supply.stok += jumlah;
    } else if (id_category === 2) { 
      if (supply.stok < jumlah) {
        throw new Error("Insufficient stock");
      }
      supply.stok -= jumlah;
    }
  
    await supplyModel.update(supply.id_supply, { stok: supply.stok });
};

getTransactionById = async (req, res) => {
    if (!isNaN(req.params.id)) {
        try {
            const data = await transactionModel.getById(req.params.id);
            return api.ok(res, data);
        } catch (error) {
            return api.error(res, "Internal Server Error", 500);
        }
    } else {
        return api.error(res, "Bad Request", 400);
    }
};

getAllTransactions = async (req, res) => {
    try {
        const data = await transactionModel.getTransaction();
        return api.ok(res, data);
    } catch (error) {
        return api.error(res, "Internal Server Error", 500);
    }
};

insertTransaction = async (req, res) => {
  try {
    const data = req.body;
    const transaction = await transactionModel.insert(data);

    // Determine whether it's a transaction 'Masuk' or 'Keluar'
    const id_category = data.id_category;
    const jumlah = data.jumlah;

    if (id_category === 1 || id_category === 2) {
      await updateStock(data.id_supply, id_category, jumlah);
    } else {
      throw new Error("Invalid category for transaction");
    }

    return api.ok(res, transaction);
  } catch (error) {
    return api.error(res, "Internal Server Error", 500);
  }
};


updateTransaction = async (req, res) => {
    try {
        const data = await transactionModel.update(req.params.id, req.body.form_data);
        return api.ok(res, data);
    } catch (error) {
        return api.error(res, "Internal Server Error", 500);
    }
};

deleteTransaction = async (req, res) => {
    if (!isNaN(req.params.id)) {
        try {
            const data = await transactionModel.deleteData(req.params.id);
            return api.ok(res, data);
        } catch (error) {
            return api.error(res, "Internal Server Error", 500);
        }
    } else {
        return api.error(res, "Bad Request", 400);
    }
};

insertTransactionMasuk = async (req, res) => {
    try {
      const data = req.body;
      const transaction = await transactionModel.insert(data);
      await updateStock(data.id_supply, 1, data.jumlah); 
      return api.ok(res, transaction);
    } catch (error) {
      return api.error(res, "Internal Server Error", 500);
    }
  };
  
  insertTransactionKeluar = async (req, res) => {
    try {
      const data = req.body;
      const transaction = await transactionModel.insert(data);
      await updateStock(data.id_supply, 2, data.jumlah); 
      return api.ok(res, transaction);
    } catch (error) {
      return api.error(res, "Internal Server Error", 500);
    }
  };

  getTransactionsBySupplyId = async (req, res) => {
    if (!isNaN(req.params.id)) {
      try {
        const data = await transactionModel.getTransactionsBySupplyId(req.params.id);
        return api.ok(res, data);
      } catch (error) {
        return api.error(res, "Internal Server Error", 500);
      }
    } else {
      return api.error(res, "Bad Request", 400);
    }
  };

  //samain semua area
 const getChartDataIBF = async (req, res) => {
    let month = req.params.month
    let year = req.params.year
    try {
      const data = await transactionModel.getChartDataIBF(month, year);
      return api.ok(res, data);
    } catch (error) {
      return api.error(res, "Internal Server Error", 500);
    }
    
  };

  const getChartDataPREPARASI = async (req, res) => {
    let month = req.params.month
    let year = req.params.year
    try {
      const data = await transactionModel.getChartDataPREPARASI(month, year);
      return api.ok(res, data);
    } catch (error) {
      return api.error(res, "Internal Server Error", 500);
    }
  };

  const getChartDataPACKING = async (req, res) => {
    let month = req.params.month
    let year = req.params.year
    try {
      const data = await transactionModel.getChartDataPACKING(month, year);
      return api.ok(res, data);
    } catch (error) {
      return api.error(res, "Internal Server Error", 500);
    }
  };
  
  

module.exports = {
    getTransactionById,
    getAllTransactions,
    insertTransaction,
    updateTransaction,
    deleteTransaction,
    insertTransactionMasuk,
    insertTransactionKeluar,
    updateStock,
    getTransactionsBySupplyId,
    getChartDataIBF,
    getChartDataPREPARASI,
    getChartDataPACKING,
  
};
