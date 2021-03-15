const Todo = require("../models/todos");
const { requireSignin } = require('../controllers/user');

// exports.addTodos = (req, res) => {
//   const addItems = {
//     text: req.body.text,
//   };

//   if (req.body.userId) {
//     addItems.userId = req.body.userId;
//   }

//   const items = new Todo(addItems);
//   items.save((error, todo) => {
//     if (error) {
//       res.status(400).json({
//         message: error,
//       });
//     }
//     if (todo) {
//       res.status(200).json({ todo });
//     }
//   });
// };

// exports.addTodos = (req, res) => {
//   const { key, text, userId } = req.body;

//   const newTodo = new Todo({
//     key,
//     text,
//     userId,
//   });

//   newTodo.save((error, data) => {
//     if (error) {
//       return res.status(400).json({
//         message: "Something went Wrong!",
//       });
//     }
//     if (data) {
//       res.status(200).json({
//         message: "Todos addedd Successfully!",
//       });
//     }
//   });
// };
exports.todos = ( requireSignin, (req, res) => {
    Todo.find((err, todos) => {
      if (err) console.log(err);
      else {
        res.json(todos);
      }
    });
  });

exports.addTodos = ((req, res) => {
    const currentTodo = {
      key: req.body.key,
      text: req.body.text,
      userId: req.body.userId
    }
    const todo = new Todo(currentTodo);
    console.log("req.body: ", req.body);
    todo
      .save()
      .then((todo) => {
        res.status(200).json({ todo: "todo added successfully" });
      })
      .catch((err) => {
        res.status(400).send("adding new todo failed");
      });
  });

exports.getUserId = (req, res) => {
  console.log('req.params',req.params)
  Todo.find({ email: req.params.email }, (err, todos) => {
    if (err) console.log(err);
    else {
      console.log(todos)
      res.json({ todos: todos });
    }
  });
};

exports.deleteTodo = (req, res) => {
  Todo.deleteOne({ _id: req.params.id }, (err, result) => {
    if (err) {
      res.status(500).send("deleting new todo failed");
    } else {
      res.status(200).json({ todo: "todo deleted successfully" });
    }
  });
};

exports.updateTodo = ((req, res) => {
    Todo.findById(req.body._id, (err, todo) => {
      if (!todo) res.status(404).send("Data is not found");
      else {
        Todo.findOneAndUpdate(
          { _id: req.body._id },
          { $set: { text: req.body.text } },
          { new: true }
        )
          .then((todo) => {
            res.json("Todo updated");
          })
          .catch((err) => {
            res.status(400).send("Update not possible");
          });
      }
    });
  });