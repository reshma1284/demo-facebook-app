var express = require('express');
var app = express();
var mongoose = require('mongoose');
var cors = require('cors');
var bodyParser = require('body-parser');
var User = require('./models/User');
var Post = require('./models/Post');
var { check, validationResult } = require('express-validator/check');
var session    = require('express-session');
const path = require("path");



//mongoose.connect('mongodb://localhost:27017/facebook');
mongoose.connect('mongodb://test:test@ds121716.mlab.com:21716/facebook');

//app.use(cors());
app.use(bodyParser.json());
// ... other app.use middleware setups
app.use(express.static(path.join(__dirname, "frontend", "build")));



// Cross-origin resource sharing - Middelware
app.use(cors({
    origin:['http://localhost:3000'],
    methods:['GET','POST', 'DELETE', 'PUT'],
    credentials: true // enable set cookie
}));

// Session - Middelware
app.use(session({
  resave: true,
  secret: 'Vt9PxTrm~E{4`9]T',
  saveUninitialized:true,
   cookie:{maxAge:16000}
 }));


app.get('/fb/test',function(req,res){
  res.send('Hello Server');
})

//registration validation///////////////////////////////////////////////////////////////////////////
const arrValidate = [
  check('name', 'Please enter a name').not().isEmpty(),
  check('email', 'Enter a valid email_id').isEmail(),
  check('country', 'Please enter country').not().isEmpty(),
  check('password', 'Password should contain atleast 6 characters').isLength({min:5, max:16}),
  check('confirmPassword', 'Passwords must match').custom((value, {req})=>value === req.body.password),
  check('name','Name should not contain numbers')
  .custom(function (value) {
    var re = /^[A-Za-z]+$/;
    if(re.test(value))
       return true;
    else
        return false;
      }),
  //if it is false it will show the message

  check('email', 'The email already exist').custom(value=>{
    return User.find({'email':value})
    .then(user => {
        if(user.length)
          return false;
          else
          return true;
      })
    })
];

app.post('/fb/register', arrValidate,function(req,res){
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    //console.log(errors);
    return res.status(422).json({errors: errors.mapped()});
  }

  let newUser = new User({
    "name": req.body.name,
    "email": req.body.email,
    "password": req.body.password,
    "gender" : req.body.gender,
    "country" : req.body.country
  });

  newUser.save()
    .then(function(record){
      console.log(record);
    })
    .catch(function(error){
      console.log(error);
    });

    res.end();
})

// app.post('/fb/register', [
//   check('name', 'please enter your full name').not().isEmpty(),
//    check('email','your email is not valid').isEmail(),
//     check('email', 'email already exist').custom(
//        function(value){
//            return User.findOne({email:value}).then(user => !user)
//            }),
//    check('password','your password should be more than 6 charchters').isLength({min:6}),
//    check('confirmPassword','your password confirmation does not match').custom(
//        (value, {req}) => value === req.body.password
//    )
// ], function (req, res) {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.send({ status: 'error', errors: errors.mapped() });
//   }
//
//
//   User.create(req.body)
//   .then(function(user){
//     res.send({status: 'success', message: 'User added successfully'});
//   })
//   .catch(function(error){
//     console.log(error);
//   });
// });

//Login validation///////////////////////////////////////////////////////

validateLogin= [
  check('email','You must enter valid email').isEmail(),
  check('password','Please enter password ').not().isEmpty(),
]

app.post('/fb/login',validateLogin,function(req,res){
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    //console.log(errors);
    return res.status(422).json({errors: errors.mapped()});
  }

  User.findOne(req.body)
  .then(function(user){
    if(!user){
      return res.send({status: 'error', message: 'User not found'});
    }
    req.session.userIsLoggedin = user;
    console.log(user);
    res.send(user);
  })
  .catch(function(error){
    res.send({error: 'error', message: 'Something went wrong'});
  })
})

//Posting  a message

app.post('/fb/postMessage', function(req,res){
      console.log(req.body);
      Post.create(req.body)
      .then(function(message){
          res.send({status: 'success', message: 'Message posted successfully'});
      })
      .catch(function(error){
        console.log(error);
        res.send({error: 'error', message: 'Something went wrong'});
      })
})

//Listing all the messages

app.get('/fb/listMessage',function(req,res){
  Post.find({}).sort({postDate: -1})
  .then(function(message){
      //console.log(message);

      res.send(message);
  })
  .catch(function(error){
      res.send({status: 'error', message: 'Something went wrong'});
  });
});

//delete message based on id
app.post('/fb/delete',function(req,res){
  console.log(req.body.messageId);
  Post.findByIdAndRemove({_id: req.body.messageId})
  .then(function(message){
    console.log(message);
    res.send({staus: 'success', message: 'Message deleted successfully'});
  })
  .catch(function(error){
    console.log(error);
    res.send({staus: 'error', message: 'something went wrong'});
  })
})

//Get message for editing
app.get('/fb/getItemForEdit/:id', function(req,res){
  console.log(req.params.id);

  Post.findById(req.params.id)
  .then(function(message){
    console.log(message);
    res.send(message);
  })
  .catch(function(error){
    res.send({staus: 'error', message: 'something went wrong'});
  })
})

//updating the messages

app.post('/fb/update/:id',function(req,res){
  Post.update({"_id": req.params.id},{"message": req.body.message},{upsert: true})
  .then(function(message){
    //console.log(message);
    res.send(message);
  })
  .catch(function(error){
    res.send({staus: 'error', message: 'something went wrong'});
  })
})

//Log out the user
app.get('/fb/logout',function(req,res){
  req.session.destroy();
  res.end();
})

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "build", "index.html"));
});


app.listen(process.env.PORT || 8080,function(){
  console.log('listening on port 8080');
})
