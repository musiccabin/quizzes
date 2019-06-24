exports.up = function (knex, Promise) {
    return knex.schema.table('clucks', function (table) {
        table.dropColumn('createdAt');
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.table('clucks', function (table) {
        table.timestamp('createdAt').defaultTo(knex.fn.now());
    })
};