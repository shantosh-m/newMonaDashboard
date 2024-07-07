const mongoose = require("mongoose");

const connectToDatabase = () => {
  mongoose.connect(
    "mongodb+srv://Shantosh:Shantosh@cluster0.vljtvi4.mongodb.net/MoldProtector",

    {
      //   useNewUrlParser: true,
      //   useUnifiedTopology: true,
    }
  );

  const db = mongoose.connection;

  db.on("error", console.error.bind(console, "MongoDB connection error:"));
  db.once("open", () => {
    console.log("Connected to MongoDB Atlas");
  });
};

module.exports = connectToDatabase;
