module.exports = {

  development: {
    client: 'pg',
    connection: {
      database: 'cluckr',
      username: 'susannah',
      password: 873287
    }
  },
  migrations: {
    directory: './migrations'
  },
  onUpdateTrigger: table => `
    CREATE TRIGGER ${table}_updated_at
    BEFORE UPDATE ON ${table}
    FOR EACH ROW
    EXECUTE PROCEDURE on_update_timestamp();
  `
};