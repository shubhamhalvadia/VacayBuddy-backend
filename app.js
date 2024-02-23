const http = require('http');
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
//const MongoDBStore = require('connect-mongodb-session')(session);
const csrf = require('csurf');
const flash = require('connect-flash');
const multer = require('multer');

const app = express();

// const MONGODB_URI = process.env.mongo_uri;
// const store = new MongoDBStore({
//     uri:MONGODB_URI,
//     collection:'sessions'
// });

// const csrfProtection = csrf();
// app.use(flash());

// const fileStorage = multer.diskStorage({
//     destination: (req,file,cb) => {
//         cb(null,'images')
//     },
//     filename: (req,file,cb) => {
//         cb(null,new Date().getTime()+'-'+file.originalname)
//     }
// });

// const fileFilter = (req,file,cb) => {
//     if(file.mimetype==='image/png' || file.mimetype==='image/jpg' || file.mimetype==='image/jpeg') {
//         cb(null,true);
//     }
//     else {
//         cb(null,false);
//     }
// };

const adminRoutes = require('./routes/admin');
const bookingRoutes = require('./routes/booking');
const authRoutes = require('./routes/auth');

//app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

// app.use(multer({storage:fileStorage,fileFilter:fileFilter}).single('image'));
// app.use(express.static(path.join(__dirname,'public')));
// app.use('/images',express.static(path.join(__dirname,'images')));

// app.use(session({

//     secret:'my secret',
//     resave:false,
//     saveUninitialized:false,
//     store:store
// }));

// app.use(csrfProtection);

// app.use((req,res,next) => {
//     res.locals.userIsLoggedIn = req.session.userIsLoggedIn;
//     // res.locals.authorIsLoggedIn = req.session.authorIsLoggedIn;
//     // res.locals.notifications = req.session.notifications;
//     res.locals.csrfToken = req.csrfToken();
//     next();
// });

// app.use((req,res,next)=> {
//     if(!req.session.user) {
//         return next();
//     }
//     else if(req.session.user) {
//         User.findById(req.session.user._id)
//             .then(user => {
//                 if(!user) {
//                     next();
//                 }
//                 req.user=user;
//                 next();
//             })
//             .catch(err => {
//                 next(new Error(err));
//             });
//     }

//     // else if(req.session.author) {
//     //     Author.findById(req.session.author._id)
//     //         .then(author => {
//     //             if(!author) {
//     //                 next();
//     //             }
//     //             req.author=author;
//     //             next();
//     //         })
//     //         .catch(err => {
//     //             next(new Error(err));
//     //         });
//     // }
// });



app.use('/admin',adminRoutes);
app.use(bookingRoutes);
app.use(authRoutes);


const server = http.createServer(app);

mongoose.connect('')
.then(result => {
    console.log('Connected');
    app.listen(8080);
})
.catch(err => {
    console.log(err);
});

