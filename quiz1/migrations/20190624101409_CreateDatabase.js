const {
    onUpdateTrigger
} = require('../knexfile')

exports.up = knex =>
    knex.schema.createTable('clucks', t => {
        t.bigIncrements('id');
        t.string('username');
        t.text('content');
        t.timestamps(true, true)
    })
    .then(() => knex.raw(onUpdateTrigger('clucks')))

exports.down = knex => knex.schema.dropTable('clucks')