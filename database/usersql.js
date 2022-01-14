var UserSql = {
    insert: 'INSERT INTO User(imgUrl, title) VALUES(?,?)',
    queryAll: 'SELECT * FROM User',
    query: 'SELECT * FROM User LIMIT ?, ?',
    getUserById: 'SELECT * FROM User WHERE id = ?',
    delete: 'DELETE FROM User WHERE id = ?',
    update:'UPDATE User SET imgUrl=?, title=? WHERE id=?',
    updateTime: 'UPDATE Time SET time=? WHERE id=?',
    getTimeById: 'SELECT time FROM Time WHERE id = 1',
}

module.exports = UserSql;
