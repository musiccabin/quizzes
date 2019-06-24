const express = require('express');
const router = express.Router();
const knex = require('../client');

// -= Article Routes =-

function display (interval) {
    let toDisplay = '';
    switch (true) {
        case (interval < 60):
            toDisplay = 'just now'
            break;
        case (interval >= 60 && interval < 3600):
            toDisplay = `${Math.floor(interval / 60)} minute(s) ago`
            break;
        case (interval >= 3600 && interval < (24 * 3600)):
            toDisplay = `${Math.floor(interval / 3600)} hour(s) ago`
            break;
        case (interval >= (24 * 3600) && interval < (7 * 24 * 3600)):
            toDisplay = `${Math.floor(interval / (3600*24))} day(s) ago`
            break;
        case (interval >= (7 * 24 * 3600) && interval < (30 * 7 * 24 * 3600)):
            toDisplay = `${Math.floor(interval / (3600*24*7))} week(s) ago`
            break;
        case (interval >= (30 * 7 * 24 * 3600) && interval < (12 * 30 * 7 * 24 * 3600)):
            toDisplay = `${Math.floor(interval / (3600*24*7*30))} month(s) ago`
            break;
        case (interval >= (12 * 30 * 7 * 24 * 3600)):
            toDisplay = `${Math.floor(interval / (3600*24*7*30*12))} year(s) ago`
            break;
    }
    return toDisplay;
}

// NAME: article#new, METHOD: GET, PATH: /articles/new
router.get('/cluckr/new', (req, res) => {
    console.log(req.cookies.username)
    const username = req.cookies.username;
    res.render('new',{username});
});

router.get('/cluckr', (req, res) => {
    knex('clucks')
        .orderBy('created_at', 'DESC')
        .then(data => {
            const username = req.cookies.username;
            res.render('clucks', {
                clucks: data,
                username: username
            })
        })
})

router.get('/cluckr/clucks', (req, res) => {
    knex('clucks')
        .orderBy('created_at', 'DESC')
        .then(data => {
            const username = req.cookies.username;
            res.render('clucks', {
                clucks: data,
                username: username,
                display: display
            })
        })
})

// router.post('/notes', (req, res) => {
//     knex('notes') // --- START SQL
//         .insert({
//             content: req.body.content,
//         })
//         .returning('*') // --- END SQL
//         .then(data => {
//             // get the first value because db data
//             // always comes in an array
//             const note = data[0];
//             // -- EXECUTE SQL
//             res.redirect(`/notes/${note.id}`);
//         });
// });

// NAME: article#create, METHOD: POST, PATH: /articles
router.post('/cluckr/clucks', (req, res) => {
    knex('clucks') // --- START SQL
        .insert({
            username: req.cookies.username,
            content: req.body.content,
            image_url: req.body.imageURL
        })
        .orderBy('created_at', 'DESC')
        .returning('*') // --- END SQL
        .then(data => {
            res.redirect('/cluckr/clucks');
            // const clucks = data;
            // const username = req.cookies.username;
            // console.log(username)
            // res.render(`clucks`,{clucks: clucks,username: username});
        });
});

// router.get('/', (req, res) => {
//     knex('articles')
//         .orderBy('createdAt', 'DESC')
//         .then(articles => {
//             res.render('articles/index', {
//                 articles: articles
//             })
//         })
// })

// router.get('/notes/:id', (req, res) => {
//     const id = req.params.id;
//     knex('notes')
//         .where('id', id)
//         .first()
//         .then(note => {
//             if (note) {
//                 res.render('show', {
//                     note: note
//                 })
//             } else {
//                 res.send(`Cannot find note with id=${id}`);
//             }
//         })
// })

// router.get('/notes/:id/edit', (req, res) => {
//     const id = req.params.id;
//     knex('notes')
//         .where('id', id)
//         .first()
//         .then(note => {
//             if (note) {
//                 res.render('edit', {
//                     note: note
//                 })
//             } else {
//                 res.send(`Cannot find article with id=${id}`);
//             }
//         })
// })

// router.delete('/notes/:id', (req, res) => {
//     const id = req.params.id;

//     knex('notes')
//         .where('id', id)
//         .del()
//         .then(() => {
//             res.redirect('/notes');
//         });
//     // res.send('Deleting ');
// });

// router.put('/notes/:id', (req, res) => {
//     const id = req.params.id;
  
//     const { content } = req.body;
  
//     knex('notes')
//       .where('id', id)
//       .first()
//       .update({
//         content
//       })
//       .returning('*')
//       .then(data => {
//         const note = data[0];
//         res.redirect(`/notes/${note.id}`);
//       });
//   });



module.exports = router;

// <% switch (true) { %>
//     <% case (interval < 60): %>
//     <% toDisplay = 'just now' %>
//     <% break; %>
//     <% case (interval >= 60 && interval < 3600): %>
//     <% toDisplay = <%=Math.floor(interval / 60)%> + 'minute(s) ago' %>
//     <% break; %>
//     <% case (interval >= 3600 && interval < (24*3600)): %>
//     <% toDisplay = `${Math.floor(interval / 3600)} hour(s) ago` %>
//     <% break; %>
//     <% case (interval >= (24*3600) && interval < (7*24*3600)): %>
//     <% toDisplay = `${Math.floor(interval / (3600*24))} day(s) ago` %>
//     <% break; %>
//     <% case (interval >= (7*24*3600) && interval < (30*7*24*3600)): %>
//     <% toDisplay = `${Math.floor(interval / (3600*24*7))} week(s) ago` %>
//     <% break; %>
//     <% case (interval >= (30*7*24*3600) && interval < (12*30*7*24*3600)): %>
//     <% toDisplay = `${Math.floor(interval / (3600*24*7*30))} month(s) ago` %>
//     <% break; %>
//     <% case (interval >= (12*30*7*24*3600)): %>
//     <% toDisplay = `${Math.floor(interval / (3600*24*7*30*12))} year(s) ago` %>
//     <% break; %>
//     <% default: %>
//     <% toDisplay = '' %>
//     <% break; %>
//     <% } %>