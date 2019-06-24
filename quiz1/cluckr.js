const express = require('express');
const logger = require('morgan');
const path = require('path');
const cookieParser = require('cookie-parser');
const knex = require('./client');

const clucksRouter = require('./routes/clucks')

// const methodOverride = require('method-override');

const app = express();
app.set('view engine','ejs');
app.set('views','views');

app.use(logger('dev'));
app.use(express.static(path.join(__dirname,"public")));
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));
// app.use(
//     methodOverride((req,res) => {
//         if (req.body && req.body._method) {
//             console.log(req.body);
//             console.log(req.body._method);
//             const method = req.body._method;
//             return method;
//         }
//     })
// )
app.use('/',clucksRouter);

app.use((req,res,next) => {
    console.log("cookies:", req.cookies);
    res.locals.username = '';
    const username = req.cookies.username;
    if (username) {
        res.locals.username = username;
    }
    next();
})

// app.use((req,res,next) => {
//     console.log("cookies:", req.cookies);
//     res.locals.username = '';
//     const username = req.cookies.username;
//     if (username) {
//         res.locals.username = username;
//     } else {
//         if (req.url === '/cluckr/sign_in') {
//             next();
//         } else {
//             res.render('signIn');
//         }
// }})

const PORT = 9090;
const ADDRESS = 'localhost';
app.listen(PORT,ADDRESS,() => {
    console.log(`server listening on ${ADDRESS}:${PORT}`);
})

app.get('/cluckr/sign_in', (req,res) => {
    // res.clearCookie('username');
    res.render('signIn');
})

app.post('/cluckr/sign_out',(req,res) => {
    // console.log(req.body);
    res.clearCookie('username');
    res.redirect('/cluckr');
    // res.end();
})

// app.get('/hello_world',(req,res) => {
//     res.send('<div>Hello World</div>');
// });

// app.get('/',(req,res) => {
//     console.log(req.cookies);
//     console.log(res.locals.username);
//     const username = res.locals.username;
//     res.render('home',{username: username, weather: 'rains'});
// })

// app.get('/contact_us',(req,res) => {
//     // console.log(req.query);
//     // console.log(req.body.fullName);
//     res.render('contactUs');
// })

// app.get('/thank_you',(req,res) => {
//     const {fullName, favColor, msg} = req.query;
//     // console.log(req.body.fullName)
//     // console.log(req.query.fullName)
//     res.render('thankYou', {fullName});
// })

const COOKIE_MAX_AGE = 1000 * 60 * 60 * 24 * 7;
app.post('/cluckr/sign_in',(req,res) => {
    res.cookie('username',req.body.username, {maxAge: COOKIE_MAX_AGE});
    res.redirect('/cluckr/clucks');
    res.end();
})

// app.post('/sign_out',(req,res) => {
//     // console.log(req.body);
//     res.clearCookie('username');
//     res.redirect('/');
//     res.end();
// })

// app.get('/articles/new',(req,res) => {
//     res.render('articles/new');
// });

// app.post('/articles',(req,res) => {
//     knex('articles')
//     .insert({
//         title: req.body.title,
//         content: req.body.content,
//         viewCount: 0
//     })
//     .returning('*')
//     .then(data => {
//         const article = data[0];
//         res.redirect(`/articles/${article.id}`);
//     })
// })