var UserSql = {
    insert: 'INSERT INTO User(uid, userName) VALUES(?,?)',
    queryAll: 'SELECT * FROM User',
    getUserById: 'SELECT * FROM User WHERE uid = ?'
}

module.exports = UserSql;
