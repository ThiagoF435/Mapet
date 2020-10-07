module.exports = function(app) {
    app.get('/perfil', function(req, res) {
        app.app.controllers.perfil.perfil(app, req, res)
    })

    app.get('/perfil/editar_senha', function(req, res) {
        app.app.controllers.perfil.editarSenha(app, req, res)
    })

    app.post('/perfil/editar_senha_salvar', function(req, res) {
        app.app.controllers.perfil.editarSenhaSalvar(app, req, res)
    })
}