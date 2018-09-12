var express = require("express");
var port = (process.env.PORT || 8080);
var app = express();
var router = express.Router();
var twilio = require('twilio');
var jade= require('jade');
var uniqueValidator = require('mongoose-unique-validator');
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var client = new twilio('AC92f97e3c9abfe8358656247c9821870d', 'f4e39857777332dde6bfa7799623c5f4');

/*database connection*/
var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/login");

/*schema for contact form*/
var nameSchema = new mongoose.Schema({
  username: {type:String},
  phoneno: {type:Number},
  subject:{type:String}
},{
  versionKey:false
}
);

/*schema for login page*/
var nameSchema1 = new mongoose.Schema({
  username: {type:String},
  password: {type:String},
  select:{type:String}
},{
  versionKey:false
}
);

/*schema for docter registeration page*/
var nameSchema2 = new mongoose.Schema({
  name: {type:String},
  username: {type: String,unique:true},
  phoneno: {type:Number,unique:true},
  hospname:{type:String},
  hospaddr:{type:String},
  qualification:{type:String},
  docid:{type:String,unique:true},
  email:{type:String,unique:true},
  pwd:{type:String,unique:true},
  confirmpwd:{type:String}
},{
  versionKey: false
});
nameSchema2.plugin(uniqueValidator);

/*schema for patient registeration page*/
var nameSchema3 = new mongoose.Schema({
  name: {type:String},
  username:{type:String,unique:true},
  phoneno: {type:Number,unique:true},
  address:{type:String},
  email:{type:String,unique:true},
  pwd:{type:String,unique:true},
  confirmpwd:{type:String},
  year:{type:Number},
  month:{type:String},
  day:{type:Number},
  gender:{type:String}
},{
  versionKey: false
});
nameSchema3.plugin(uniqueValidator);

/*schema for reset page*/
var nameSchema4 = new mongoose.Schema({
  username:{type:String},
  oldPassword:{type:String},
  newPassword: {type:String},
  confirmPassword: {type:String}
},{
  versionKey:false
});

/*schema for doctor details*/
var nameSchema5 = new mongoose.Schema({
  id:{type:String,unique:true},
  name: {type:String},
  qualification: {type:String}
},{
  versionKey:false
}
);
nameSchema5.plugin(uniqueValidator);

/*schema for saving hospital database*/
var nameSchema6 = new mongoose.Schema({
  name: {type:String},
  username:{type:String,},
  age: {type:Number},
  select:{type:String},
  number:{type:Number},
  email:{type:String},
  problem:{type:String},
  address:{type:String},
  docvisit:{type:String}
},{
  versionKey: false
});

/*admin registration schema*/
var nameSchema7 = new mongoose.Schema({
  name: {type:String},
  idno:{type:String,unique:true},
  username: {type:String,unique:true},
  userid:{type:String,unique:true},
  phoneno:{type:Number},
  hospname:{type:String},
  hospaddr:{type:String},
  qualification:{type:String},
  Email:{type:String},
  pwd:{type:String,unique:true},
  confirmpwd:{type:String}
},{
  versionKey: false
});
nameSchema7.plugin(uniqueValidator);


/*schema for saving drug details*/
var nameSchema8 = new mongoose.Schema({
  drugname: {type:String},
  pharmacyname:{type:String},
  address: {type:String}
},{
  versionKey:false
});

/*schema for admin details*/
var nameSchema9 = new mongoose.Schema({
  id:{type:String,unique:true},
  name: {type:String},
  qualification: {type:String},
  hospname: {type:String},
  hospaddr: {type:String}
},{
  versionKey:false
}
);
nameSchema9.plugin(uniqueValidator);

/*schema for doctor prescription page*/
var nameSchema10 = new mongoose.Schema({
  hospitalname:{type:String},
  address: {type:String},
  name: {type:String},
  username:{type:String},
  phonenumber: {type:Number},
  age: {type:Number},
  gender: {type:String},
  docname:{type:String},
  qualification:{type:String},
  medicine:{type:String}
},{
  versionKey:false
}
);
/*shema for prescription view page username*/
var nameSchema11 = new mongoose.Schema({
  username: {type:String}
},{
  versionKey:false
});

/*schema for patient prescription*/
var nameSchema12 = new mongoose.Schema({
  username: {type:String}
},{
  versionKey:false
});

/*schema for drug search*/
var nameSchema13 = new mongoose.Schema({
  drugname: {type:String}
},{
  versionKey:false
});

/*schema call for all pages*/
var Contact = mongoose.model("Contact",nameSchema);
var User = mongoose.model("User", nameSchema1);
var Docregister = mongoose.model("Docregister", nameSchema2);
var Patregister = mongoose.model("Patregister",nameSchema3);
var Confirmpwd = mongoose.model("Confirmpwd",nameSchema4);
var Docdetail = mongoose.model("Docdetail",nameSchema5);
var Hospdb = mongoose.model("Hospdb",nameSchema6);
var Adminregister =mongoose.model("Adminregister",nameSchema7);
var Drug = mongoose.model("Drug", nameSchema8);
var Admindetail = mongoose.model("Admindetail",nameSchema9);
var Docprescription = mongoose.model("Docprescription",nameSchema10);
var Presview = mongoose.model("Presview",nameSchema11);
var Patview = mongoose.model("Patview",nameSchema12);
var Patview1 = mongoose.model("Patview1",nameSchema13);

/*code to display html pages*/

/*display home page*/
app.use("/home", (req, res) => {
  res.sendFile(__dirname + "/home.html");
});

/*login credentials*/
app.use("/login", (req, res) => {
  res.sendFile(__dirname + "/login.html");
});

/*login credentials*/
/*displaying prescription page*/

app.use("/prescriptionpage1", (req, res) => {
    res.sendFile(__dirname + "/prescriptionpage.html");
});

app.use("/prescriptionpage",(req,res)=>{
 var data1=new User(req.body);
 Docregister.findOne({username:req.body.username,confirmpwd:req.body.password}, function(error, user) {
   if(user){
  data1.save()
   .then(item => {
    res.redirect('/prescriptionpage1');
    })
    .catch(err => {
      res.status(400).send("unable to save to database");
    });
  }
  else {
    res.send('wrong username & password');
  }
});
  });

  app.use("/patprescriptionpage1", (req, res) => {
      res.sendFile(__dirname + "/patprescriptionpage.html");
  });
  app.use("/patprescriptionpage",(req,res)=>{
    var data1 = new User(req.body);
    Patregister.findOne({username:req.body.username,confirmpwd:req.body.password}, function(error, user) {
      if(user){
    data1.save()
      .then(item => {
        res.redirect('/patprescriptionpage1');
      })
      .catch(err => {
        res.status(400).send("unable to save to database");
      });
    }
    else {
      res.send('wrong username & password');
    }
  });
      });

      app.use("/adminoption1", (req, res) => {
          res.sendFile(__dirname + "/adminoption.html");
      });
    app.use("/adminoption",(req,res)=>{
      var data1 = new User(req.body);
      Adminregister.findOne({username:req.body.username,confirmpwd:req.body.password}, function(error, user) {
        if(user){
      data1.save()
        .then(item => {
          res.redirect('/adminoption1');
        })
        .catch(err => {
          res.status(400).send("unable to save to database");
        });
      }
      else {
        res.send('wrong username & password');
      }
    });
      });

/*reset page*/
app.use("/reset", (req, res) => {
      res.sendFile(__dirname + "/reset.html");
      });
app.use("/login1",(req,res)=>{
        var data2 = new Confirmpwd(req.body);
        Docregister.findOneAndUpdate({username:req.body.username,confirmpwd:req.body.oldPassword},{$set:{pwd:req.body.newPassword,confirmpwd:req.body.confirmPassword}},{new:true},function(error,user){
          if(user){
            data2.save()
              .then(item => {
                res.redirect('/login');
              })
              .catch(err => {
                res.status(400).send("unable to save to database");
              });
            }
          else{
            Patregister.findOneAndUpdate({username:req.body.username,confirmpwd:req.body.oldPassword},{$set:{pwd:req.body.newPassword,confirmpwd:req.body.confirmPassword}},{new:true},function(error,user){
              if(user){
                data2.save()
                  .then(item => {
                    res.redirect('/login');
                  })
                  .catch(err => {
                    res.status(400).send("unable to save to database");
                  });
                }
              else{
                Adminregister.findOneAndUpdate({username:req.body.username,confirmpwd:req.body.oldPassword},{$set:{pwd:req.body.newPassword,confirmpwd:req.body.confirmPassword}},{new:true},function(error,user){
                  if(user){
                    data2.save()
                      .then(item => {
                        res.redirect('/login');
                      })
                      .catch(err => {
                        res.status(400).send("unable to save to database");
                      });
                    }
                  else{
                    res.send('check username & old password...');
                  }
              });
              }
            });
          }
        });
      });

/*registration options*/
app.use("/registeroption", (req, res) => {
  res.sendFile(__dirname + "/registeroption.html");
});

/*response after registeration*/
app.use("/response", (req, res) => {
  res.sendFile(__dirname + "/response.html");
});

/*doctor registeration display page*/
app.use("/docregister", (req, res) => {
  res.sendFile(__dirname + "/docregister.html");
});

/*docter registration saving*/
app.use('/response1', (req, res) => {
      var data3 = new Docregister(req.body);
      Docdetail.findOne({id:req.body.docid,name:req.body.name}, function(error, user) {
        if(user){
      data3.save()
        .then(item => {
          res.redirect('/response');
        })
        .catch(err => {
          res.status(400).send("username & password must be unique..Also check the id & email..");
        });
      }
      else {
        res.send('error in matching id and name');
      }
    });
    });

/*patient registration page*/
app.use("/patregister", (req, res) => {
  res.sendFile(__dirname + "/patregister.html");
});

/*patient registration savings*/
app.use('/response2', (req, res) => {
  var data4 = new Patregister(req.body);
  data4.save()
    .then(item => {
      res.redirect('/response');
    })
    .catch(err => {
      res.status(400).send("username & password must be unique");
    });
});

/*admin registeration page*/
app.use("/adminregister", (req, res) => {
  res.sendFile(__dirname + "/adminregister.html");
});

/*admin registration savings*/
app.use('/response3', (req, res) => {
  var data5 = new Adminregister(req.body);
  Admindetail.findOne({id:req.body.userid,name:req.body.name}, function(error, user) {
    if(user){
  data5.save()
    .then(item => {
      res.redirect('/response');
    })
    .catch(err => {
      res.status(400).send("username & password must be unique...Also check the id no");
    });
  }
  else {
    res.send('error in matching id and name');
  }
});
});

app.use("/docdetails", (req, res) => {
  res.sendFile(__dirname + "/docdetails.html");
});
/*app.use("/prescriptionpage", (req, res) => {
  res.sendFile(__dirname + "/prescriptionpage.html");
});*/

app.use("/adminoption", (req, res) => {
  res.sendFile(__dirname + "/adminoption.html");
});

app.use("/about", (req, res) => {
  res.sendFile(__dirname + "/about.html");
});
app.use("/contact", (req, res) => {
  res.sendFile(__dirname + "/contact.html");
});

app.use("/map", (req, res) => {
  res.sendFile(__dirname + "/map.html");
});
/*saving data to database and showing result*/
/*contact form*/

app.use('/sms', (req, res) => {
  var data6 = new Contact(req.body);
  data6.save()
    .then(item => {
      // Send the text message.
      client.messages.create({
        to: '+919629040736',
        from: '+15103990433',
        body: 'there is a report from user'
      });
      res.sendFile(__dirname + "/sms.html");
    })
    .catch(err => {
      res.status(400).send("unable to save to database");
    });
});

/*saving doctor details to database*/
app.use('/docdetailsave', (req, res) => {
  var data7 = new Docdetail(req.body);
  data7.save()
    .then(item => {
      res.redirect('/docdetails');
    })
    .catch(err => {
      res.status(400).send("unable to save to database..check whether id is unique");
    });
});

/*dispaying hospital database page*/
app.use("/hospdb", (req, res) => {
  res.sendFile(__dirname + "/hospdb.html");
});

/*saving patient database in hospital*/
app.use('/hospdbsave', (req, res) => {
  var data8 = new Hospdb(req.body);
  data8.save()
    .then(item => {
      res.redirect("/hospdb");
    })
    .catch(err => {
      res.status(400).send("unable to save to database");
    });
});

/*drug details page display*/
app.use("/drugdb", (req, res) => {
res.sendFile(__dirname + "/drug.html");
});

/*drug details saving to database*/
app.use('/drugdetailsave', (req, res) => {
  var data9 = new Drug(req.body);
  data9.save()
    .then(item => {
      res.redirect("/drugdb");
    })
    .catch(err => {
      res.status(400).send("unable to save to database");
    });

});

/*display admin details page*/
app.use("/admindetails", (req, res) => {
  res.sendFile(__dirname + "/admindetails.html");
});

/*saving admin details*/
app.use('/admindetailsave', (req, res) => {
  var data10 = new Admindetail(req.body);
  data10.save()
    .then(item => {
      res.redirect("/admindetails");
    })
    .catch(err => {
      res.status(400).send("unable to save to database..check whether id is unique..");
    });

});

/*doctor prescription page saving*/
app.use('/confirm', (req, res) => {
  var data11 = new Docprescription(req.body);
  data11.save()
    .then(item => {
            res.sendFile(__dirname + "/confirm.html");
    })
    .catch(err => {
      res.status(400).send("unable to save to database");
    });

});

/*view prescription by doctor*/
app.use("/view1", (req, res) => {
  res.sendFile(__dirname + "/view1.html");
});
app.set('view engine','jade');
app.use("/view",(req,res)=>{
  var data12 = new Presview(req.body);
  Docprescription.find({docname:req.body.username},function(err,docs){
    if(err){
      res.json(err);
    }
    else{
          res.render('index',{users:docs});
    }
});
});
/* patient prescription page*/
app.use("/patprescriptionpage", (req, res) => {
  res.sendFile(__dirname + "/patprescriptionpage.html");
});

/*prescription view*/
app.use("/patview",(req,res)=>{
  var data13 = new Patview(req.body);
  Docprescription.find({username:req.body.username},function(err,docs){
    if(err){
      res.json(err);
    }
    else{
          res.render('index',{users:docs});
    }
});
});

/* drug search*/
app.use("/patview1",(req,res)=>{
  var data14 = new Patview1(req.body);
  Drug.find({drugname:req.body.drugname},function(err,docs){
    if(err){
      res.json(err);
    }
    else{
          res.render('layout',{users:docs});
    }
});
});
/*app.use("/viewcontact",(req,res)=>{
  Contact.find({},function(err,docs){
    if(err){
      res.json(err);
    }
    else{
          res.render('error',{users:docs});
    }
});
});
*/
/*server listening to port*/
app.listen(port, () => { console.log("Server listening on port " + port); });
module.exports = router;
