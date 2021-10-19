function auth(require,response,next) {
    if (require.session.user != undefined) {
        next();
    }else{
        response.redirect("/admin/login");
    }
}

module.exports = auth;