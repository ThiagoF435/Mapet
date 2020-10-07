module.exports.perfil = function(app, req, res) {
    if(req.session.loggedin != true) {
        return res.redirect('/')
    }

    res.render('perfil/perfil', {session : req.session})
}

module.exports.editarSenha = function(app, req, res) {
    if(req.session.loggedin != true) {
        return res.redirect('/')
    }

    var id = parseInt(req.query.id)

    res.render('perfil/editar_senha', {erro : '', id : id})
}

module.exports.editarSenhaSalvar = function(app, req, res) {
    if(req.session.loggedin != true) {
        return res.redirect('/')
    }

    var obj = req.body
    var id = parseInt(req.body.id)

    if(obj.novaSenha != obj.confirmarNovaSenha) {
        return res.render('perfil/editar_senha', {erro : 'Erro ao confirmar nova senha!', id : id})
    }

    var conn = app.config.databaseConnection()
    var model = new app.app.models.UsuarioDAO(conn)

    model.pesquisarId(id, function(err, result) {
        if(err) throw err

        if(obj.senhaAntiga != result[0].senha) {
            return res.render('perfil/editar_senha', {erro : 'Senha antiga incorreta!', id : id})
        }

        model.editarSenha(id, obj.novaSenha, function(err, result) {
            if(err) throw err

            res.redirect('/perfil')
        })

    })
}