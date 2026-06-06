const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const userModel = require('./models/user');



app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Home route
app.get('/', (req, res) => {
  res.render('index');
});

//read the user data
app.get('/read', async (req, res) => {

  let users = await userModel.find();


  res.render('read',{users});
});


//Create new users
app.post('/create', async (req, res) => {
  
    
    let { name, email, imageURL } = req.body;
    let createdUser = await userModel.create({
      name,
      email,
      imageURL
    });
    res.redirect('/read');
 
});


app.get('/delete/:id', async (req, res) => {
  
  await userModel.findByIdAndDelete(req.params.id);

  res.redirect('/read');
});



app.listen(port, (error) => {
  if (error) throw error;
  console.info(`Ready on port ${port}`);
});