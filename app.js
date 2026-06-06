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


app.get('/edit/:userId', async (req, res) => {
  
   let updateUser = await userModel.findOne({_id:req.params.userId})

  res.render('edit',{updateUser})
});

app.post('/update/:userId', async (req, res) => {
  let {imageURL, name , email} = req.body;
   let user= await userModel.findOneAndUpdate({_id:req.params.userId},{imageURL, name , email},{new:true})

  res.redirect('/read')
});


app.listen(port, (error) => {
  if (error) throw error;
  console.info(`Ready on port ${port}`);
});