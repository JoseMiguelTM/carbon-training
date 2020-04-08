function checkUser(req, res, next) {
    console.log('OKAAAAY');
}

module.exports = (app) => {
    app.post('/api/checkUser', [checkUser]);
}