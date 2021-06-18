
var express = require('express');
var path = require('path');
var app = express();
var fs = require('fs');
const { get } = require('http');
var session = require('express-session');
var bodyParser=require('body-parser');

var databasefile = 'database.json';
//NEW 
var currentUser = "";
let booksSearched=[];
//-----N
let allBooks=[{name:"Lord of the Flies",value:"flies"},{name:"The Grapes of Wrath",value:"grapes"}
,{name:"Leaves of Grass",value:"leaves"},{name:"The Sun and Her Flowers",value:"sun"},{name:"Dune",value:"dune"},{name:"To Kill a Mockingbird",value:"mockingbird"}];
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret:'sobeih$$zakaria$$engy$$',
    resave:false,
    saveUninitialized:false}));


    if(process.env.PORT){
        app.listen(process.env.PORT,function(){console.log('server-started')});
    }
    else{
        app.listen(3000,function(){console.log('server started on port 3000')});
    }
 

// all get requests for all views

app.get('/',function(req,res){
    res.render('login',{warning:"I dont have an account"});
});

//New
app.get('/registration',function(req,res){
    res.render('registration',{value:""});
});
//-------N

app.get('/novel',function(req,res){
    res.render('novel');
});

app.get('/poetry',function(req,res){
    res.render('poetry');

});

app.get('/fiction',function(req,res){
    res.render('fiction');
});

app.get('/readlist',function(req,res){
    res.render('readlist');
    
});

//Newwwww
app.get('/dune',function(req,res){
    res.render('dune',{message:""});
});

app.get('/mockingbird',function(req,res){
    res.render('mockingbird',{message:""});
});

app.get('/sun',function(req,res){
    res.render('sun',{message:""});
});

app.get('/grapes',function(req,res){
    res.render('grapes',{message:""});
});

app.get('/flies',function(req,res){
    res.render('flies',{message:""});
});

app.get('/leaves',function(req,res){
    res.render('leaves',{message:""});
});
//--------N



// functionality for the register

app.post('/register',function(req,res){

    var invalidPass=false;
    var susUsername = req.body;
    const jsonfilecontent = loadJSON(databasefile);
    var isImposter = false;
   
    //NEW
    let books = [];
    let newData = {
        username : susUsername.username,
        password : susUsername.password,
        booksArray : books
    };
//-----

    for (let data of jsonfilecontent) {
        if(data.username === susUsername.username ){
        
            isImposter = true;
            res.render('registration',{value:"That username already exists!"});
            break;
        }
}


    if(!isImposter){

        if((susUsername.password!="") && (susUsername.username!="")){

            for(let charact of susUsername.password){
                if (charact===' '){
                    res.render('registration',{value:"Password can not be empty or contain spaces , Please enter valid password"});
                    invalidPass=true;
                    break;
                }
            } 

            if(!invalidPass){
                jsonfilecontent.push(newData);
                saveJSON(databasefile,jsonfilecontent);
                res.redirect('/');
            } 
        }
             else{
                res.render('registration',{value:"Please enter password and username"});
            }
    
        }       
    }



);

// functionality for the login

app.post('/home',function(req,res){
    
    var susUsername = req.body;
    const jsonfilecontent = loadJSON(databasefile);
    var susUsername = req.body;
    var isUserExist =false;

    

    for(userTest of jsonfilecontent){

        if(userTest.username === susUsername.username && userTest.password === susUsername.password){
            req.session.currentUser=userTest.username;
            
            res.render('home');
            isUserExist = true;
            break;
        }
    }
   
        if(isUserExist === false){
        
            res.render('login',{warning:" You entered wrong username or password, Please register here"});
        }
}); 


//NEW
// handles the addition of the books into the current user's DB array. 
app.post('/dune',function(req,res){

    let book = "dune";
    let isExist = false;

    const users = loadJSON(databasefile);
    for (const user of users) {
        if(user.username === req.session.currentUser){
            for (const bookVal of user.booksArray) {
                if(bookVal === book){
                    res.render('dune',{message:"This book is already in the Read List"});
                    isExist = true;
                    break;
                }
            }

            if(!isExist){
            user.booksArray.push(book);
            }
            break;
        }
    }

    saveJSON(databasefile,users);

    res.render('dune',{message:"The book was added successfully!"});

});

app.post('/flies',function(req,res){

    let book = "flies";
    let isExist = false;

    const users = loadJSON(databasefile);
    for (const user of users) {
        if(user.username === req.session.currentUser){
            for (const bookVal of user.booksArray) {
                if(bookVal === book){
                    res.render('flies',{message:"This book is already in the Read List"});
                    isExist = true;
                    break;
                }
            }

            if(!isExist){
            user.booksArray.push(book);
            }
            break;
        }
    }

    saveJSON(databasefile,users);

    if(!isExist){
    res.render('flies',{message:"The book was added successfully!"});
    }
});

app.post('/grapes',function(req,res){

    let book = "grapes";
    let isExist = false;

    const users = loadJSON(databasefile);
    for (const user of users) {
        if(user.username === req.session.currentUser){
            for (const bookVal of user.booksArray) {
                if(bookVal === book){
                    res.render('grapes',{message:"This book is already in the Read List"});
                    isExist = true;
                    break;
                }
            }

            if(!isExist){
            user.booksArray.push(book);
            }
            break;
        }
    }

    saveJSON(databasefile,users);

    if(!isExist)
    res.render('grapes',{message:"The book was added successfully!"});

});

app.post('/leaves',function(req,res){

    let book = "leaves";
    let isExist = false;

    const users = loadJSON(databasefile);
    for (const user of users) {
        if(user.username === req.session.currentUser){
            for (const bookVal of user.booksArray) {
                if(bookVal === book){
                    res.render('leaves',{message:"This book is already in the Read List"});
                    isExist = true;
                    break;
                }
            }

            if(!isExist){
            user.booksArray.push(book);
            }
            break;
        }
    }

    saveJSON(databasefile,users);

    if(!isExist){
    res.render('leaves',{message:"The book was added successfully!"});
    }
});

app.post('/mockingbird',function(req,res){

    let book = "mockingbird";
    let isExist = false;

    const users = loadJSON(databasefile);
    for (const user of users) {
        if(user.username === req.session.currentUser){
            for (const bookVal of user.booksArray) {
                if(bookVal === book){
                    res.render('mockingbird',{message:"This book is already in the Read List"});
                    isExist = true;
                    break;
                }
            }

            if(!isExist){
            user.booksArray.push(book);
            }
            break;
        }
    }

    saveJSON(databasefile,users);

    if(!isExist){
    res.render('mockingbird',{message:"The book was added successfully!"});
    }
});

app.post('/sun',function(req,res){

    let book = "sun";
    let isExist = false;

    const users = loadJSON(databasefile);
    for (const user of users) {
        if(user.username === req.session.currentUser){
            for (const bookVal of user.booksArray) {
                if(bookVal === book){
                    res.render('sun',{message:"This book is already in the Read List"});
                    isExist = true;
                    break;
                }
            }

            if(!isExist){
            user.booksArray.push(book);
            }
            break;
        }
    }

    saveJSON(databasefile,users);

    if(!isExist){
    res.render('sun',{message:"The book was added successfully!"});
    }
});

app.post('/search',(req,res)=>{
   booksSearched=[];
   let searchWord=req.body.Search.toLowerCase();
   if(searchWord.trim()==""){
    booksSearched=[];   
   }
   else{
            for(let book of allBooks)
            {   
                var n=book.name.toLowerCase().search(searchWord);
                if(n !== -1)
                {
                    booksSearched.push(book.value);
                }
            }
      }
   res.render('searchresults');
});




//Get requests


app.get('/getSearchedBooks',(req,res)=>{
    res.send(booksSearched);
}
)

app.get('/tobeadded',(req,res)=>{
const users = loadJSON(databasefile);

let bookstoadd=[];
for (const user of users) {
    if(user.username === req.session.currentUser){
    bookstoadd=user.booksArray;
    break;
    }
}
res.send(bookstoadd);
});

// ----------------------------
function loadJSON(filename = ''){
    return (JSON.parse( fs.readFileSync(filename,function(err,data){}).toString()));

};

function saveJSON(filename = '',json = '""'){
    return (fs.writeFileSync(filename,JSON.stringify(json),function(err){}));
 
};
