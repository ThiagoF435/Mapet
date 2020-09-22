module.exports = function(app) {
    app.get('/', function(req, res) {
        app.app.controllers.admin.adminModulos(app, req, res)
    })
}