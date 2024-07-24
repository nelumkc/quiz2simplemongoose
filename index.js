const mongoose = require('mongoose');

const express = require('express')
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// require('dotenv').config();

const port = process.env.PORT || 3000;

// Create a Schema object
const Schema = mongoose.Schema;

// Create a Model object
const studentSchema = new Schema({
  myName: { type: String, required: true },
  mySID: { type: Number, required: true },
});

const Student = mongoose.model("s24students", studentSchema);

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/form.html")
});

app.post('/', async (req, res) => {
  // get the data from the form
  const URI = req.body.myuri

  // connect to the database and log the connection
  mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');

        // add the data to the database
        const newStudent =  new Student ({
          myName: 'Chandramini Nelum Kumari Range Bandara Mudiyanselage', 
          mySID : 300365641, 
        });

        newStudent
            .save()
            //.then(()=> res.json('Student added successfully'))
            .then(()=> res.send(`<h1>Document  Added</h1>`))// send a response to the user
            .catch((err)=> res.status(400).json('error' +  err))

    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });
  // send a response to the user
  //res.send(`<h1>Document  Added</h1>`);
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
