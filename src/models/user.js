const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    token: {
      type: String,
    },
    hash_password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// hashing Password
userSchema.virtual("password").set(function (password) {
  this.hash_password = bcrypt.hashSync(password, 10);
});

// userSchema.pre("save", function save(next) {
//   const user = this;
//   // if (!user.isModified("password")) {
//   //     return next();
//   // }
//   bcrypt.genSalt(10, (err, salt) => {
//     if (err) {
//       return next(err);
//     }
//     bcrypt.hash(user.password, salt, undefined, (err, hash) => {
//       if (err) {
//         return next(err);
//       }
//       user.password = hash;
//       next();
//     });
//   });
// });

//comparing Password
userSchema.methods = {
  authenticate: function (password) {
    console.log("password", password);
    return bcrypt.compareSync(password, this.hash_password);
  },
};

module.exports = mongoose.model("User", userSchema);
