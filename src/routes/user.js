const express = require("express");
const { signup, signin, requireSignin} = require("../controllers/user");
const { addTodos, deleteTodo, getUserId, updateTodo, todos } = require('../controllers/todos');

const {
  validateRequest,
  validateSigninRequest,
  isRequestValidated,
} = require("../validators/auth");
const router = express.Router();

router.post("/signup", validateRequest, isRequestValidated, signup);
router.post("/signin", validateSigninRequest, isRequestValidated, signin);

router.post('/todos/add', addTodos);
router.get('/todos/:userId',getUserId);
router.get('/todos', requireSignin,  todos);
router.delete('/todos/delete/:id', deleteTodo);
router.put('/todos/update/:id', updateTodo);

module.exports = router;
