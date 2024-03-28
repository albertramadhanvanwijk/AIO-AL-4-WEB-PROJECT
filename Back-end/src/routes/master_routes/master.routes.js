var express = require("express");
var router = express.Router();

const UserController = require("../../controller/master_controller/UserController");
const AreaController = require("../../controller/master_controller/AreaController");
const CategoryController = require("../../controller/master_controller/CategoryController");
const TransactionController = require("../../controller/master_controller/TransactionController");
const SupplyController = require("../../controller/master_controller/SupplyController");

// SOP
const DocumentController = require("../../controller/master_controller/DocumentController");
const ProggressController = require("../../controller/master_controller/ProgressController");

// PARTS
const PartsController = require("../../controller/master_controller/PartsController");
const OutputController = require("../../controller/master_controller/OutputController");

// QUIZ
const QuizController = require("../../controller/master_controller/QuizController");

// transaction
router.get("/transactions", TransactionController.getAllTransactions);
router.get("/transactions/:id", TransactionController.getTransactionById);
router.post("/transactions", TransactionController.insertTransaction);
router.put("/transactions/:id", TransactionController.updateTransaction);
router.delete("/transactions/:id", TransactionController.deleteTransaction);
router.post(
  "/transactions/masuk",
  TransactionController.insertTransactionMasuk
);
router.post(
  "/transactions/keluar",
  TransactionController.insertTransactionKeluar
);
router.post("/transactions/transaksi", TransactionController.updateStock);
router.get(
  "/transactions/supply/:id",
  TransactionController.getTransactionsBySupplyId
);
router.get("/grafik/ibf/:month/:year", TransactionController.getChartDataIBF);
router.get(
  "/grafik/preparasi/:month/:year",
  TransactionController.getChartDataPREPARASI
);
router.get(
  "/grafik/packing/:month/:year",
  TransactionController.getChartDataPACKING
);

// Supplies
router.get("/supplies/:id", SupplyController.getSupplyById);
router.get("/supplies/area/:area", SupplyController.getSuppliesByArea);
router.get("/supplies", SupplyController.getAllSupplies);
router.post("/supplies", SupplyController.insertSupply);
router.put("/supplies/:id", SupplyController.updateSupply);
router.put("/soft-delete-supplies/:id", SupplyController.softDelete);
router.get("/amount", SupplyController.getAmountSupply);

// User
router.get("/users", UserController.getAllUsers);
router.get("/users/:id", UserController.getUserById);
router.get("/users-team/:id", UserController.getUserByTeamId);
router.get("/user/:areaId/:groupId", UserController.getUserByAreaId);
router.post("/users", UserController.insertUser);
router.put("/users/:id", UserController.updateUser);
router.delete("/users/:id", UserController.deleteUser);
router.get("/user-by-role/:id", UserController.getUserByRoleId);
router.get("/spv/:id/:groupId", UserController.getSpv);
router.get("/role", UserController.getAllRole);
router.get("/line", UserController.getAllLine);
router.get("/team", UserController.getAllTeam);

// Area
router.get("/areas", AreaController.getAllAreas);
router.get("/areas/:id", AreaController.getAreaById);
router.post("/areas", AreaController.insertArea);
router.put("/areas/:id", AreaController.updateArea);
router.delete("/areas/:id", AreaController.deleteArea);

// Category
router.get("/categories", CategoryController.getAllCategories);
router.get("/categories/:id", CategoryController.getCategoryById);
router.post("/categories", CategoryController.insertCategory);
router.put("/categories/:id", CategoryController.updateCategory);
router.delete("/categories/:id", CategoryController.deleteCategory);

// Document
router.get("/documents", DocumentController.getAllDocument);
router.get("/documents/:id", DocumentController.getDocumentById);
router.get("/document/:id", DocumentController.getDocumentsByArea);
router.post("/document", DocumentController.insertDocument);
router.put("/update-document/:id", DocumentController.updateDocument);
router.get("/documentByUp", DocumentController.getAllUp);
router.put("/soft-delete/:id", DocumentController.softDelete);

// Progress
router.get(
  "/userprogress/:userId",
  ProggressController.getUserProgressByUserId
);
router.get(
  "/document/:areaId/:userId",
  ProggressController.getDocumentsByUserAndArea
);
router.get(
  "/calculate/:userId/:areaId",
  ProggressController.calculateTotalCompletedForUser
);
router.put(
  "/update-progress/:document_id/:id_user",
  ProggressController.updateProgress
);
router.post("/add-progress", ProggressController.insertProgress);
router.get(
  "/progress-by-group/:groupId",
  ProggressController.calculatePercentageCompletedForGroup
);
router.get(
  "/percentage-by-group/:groupId",
  ProggressController.percentageByGroup
);
router.get(
  "/percentage-team-bygroup/:groupId/:areaId",
  ProggressController.perceentageTeamByGroup
);
router.get(
  "/completed/:userId/:areaId",
  ProggressController.completedProgressUser
);

// parts
router.get("/parts", PartsController.getAllParts);
router.get("/part/:partId", PartsController.getPartById);
router.post("/part", PartsController.insertPart);
router.put("/part/:partId", PartsController.updatePart);
router.put("/delete-part/:partId", PartsController.sofDelete);
router.get("/parts/:areaId", PartsController.getAllByAreaId);
router.get(
  "/total-part-group-by-area",
  PartsController.getTotalPartGroupByArea
);
router.get("/stock-remain", PartsController.getAllStockRemain);

// Output
router.get("/output", OutputController.getAllOutputParts);
router.get(
  "/output-by-outputid/:outputId",
  OutputController.getOutputByOutputId
);
router.get("/output-by-partid/:partId", OutputController.getOutputByPartId);
router.post("/output", OutputController.insertOutputPart);
router.put("/output/:outputId", OutputController.updateByOutputId);
router.put("/delete-output/:outputId", OutputController.softDelete);
router.get("/total-remainOut/:partId", OutputController.totalRemainOutByPartId);
router.get("/total-remainIn/:partId", OutputController.totalRemainInByPartId);
router.get("/detail-output/:partId", OutputController.getDetailOutput);
router.get("/total-price/:areaId", OutputController.getTotalPrice);
router.get("/output-by-outputPartId/:outputId", OutputController.getOutputByOutputId);

// QUESTIONS
router.get("/questions", QuizController.getAllQuestions);
router.get("/question/:areaID", QuizController.getAllQuestionByAreaID);
router.get("/detail-question/:id", QuizController.getQuestionById);
router.post("/question", QuizController.addQuestion);
router.put("/question/:questionID", QuizController.updateQuestion);
// ANSWER
router.get("/answer/:questionID", QuizController.getAnswerByQuestion);
router.get("/edit-answer/:id", QuizController.getAnswerById);
router.post("/answer", QuizController.addAnswer);
router.put("/answer/:answerID", QuizController.updateAnswer);

// Result
router.get("/total-score/:id", QuizController.getTotalScoreByUserID);
router.post("/add-result", QuizController.addResultByUserID);

module.exports = router;
