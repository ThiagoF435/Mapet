module.exports.cadastrar = function(app, req, res) {
    res.render('usuarios/cadastrar', {validacao : {}})
}

module.exports.salvarCadastro = function(app, req, res) {
    var conn = app.config.databaseConnection()
    var model = new app.app.models.UsuarioDAO(conn)
    var obj = req.body

    model.cadastrar(obj, function(err, result) {
        if(err) throw err

        res.redirect('/usuarios/listar')
    })
}

module.exports.deletar = function(app, req, res) {
    var conn = app.config.databaseConnection()
    var model = new app.app.models.UsuarioDAO(conn)
    var id = parseInt(req.query.id)

    model.deletar(id, function(err, result) {
        if(err) throw err

        res.redirect('/usuarios/listar')
    })
}

module.exports.editar = function(app, req, res) {
    var id = parseInt(req.query.id)
    var conn = app.config.databaseConnection()
    var model = new app.app.models.UsuarioDAO(conn)

    model.pesquisarId(id, function(err, result) {
        res.render('usuarios/editar', {validacao : {}, id : id, dados : result })
    })
}

module.exports.visualizar = function(app, req, res) {
    var id = parseInt(req.query.id)
    var conn = app.config.databaseConnection()
    var model = new app.app.models.UsuarioDAO(conn)

    model.pesquisarId(id, function(err, result) {
        res.render('usuarios/visualizar', {validacao : {}, dados : result })
    })
}

module.exports.salvarEdicao = function(app, req, res) {
    var obj = req.body
    var id = parseInt(req.body.id)
    var conn = app.config.databaseConnection()
    var model = new app.app.models.UsuarioDAO(conn)

    model.pesquisarId(id, function(err, result) {
        if(err) throw err

        if(obj.email == '') 
            obj.email = result[0].email
        if(obj.senha == '') 
            obj.senha = result[0].senha
        if(obj.nome == '') 
            obj.nome = result[0].nome
        if(obj.sobrenome == '') 
            obj.sobrenome = result[0].sobrenome
        if(obj.data_nasc == '') 
            obj.data_nasc = result[0].data_nasc
        if(obj.rg == '') 
            obj.rg = result[0].rg
        if(obj.cargo == '') 
            obj.cargo = result[0].cargo
        if(obj.telefone == '') 
            obj.telefone = result[0].telefone
        
        model.editar(id, obj.email, obj.senha, obj.nome, obj.sobrenome, obj.data_nasc, obj.rg, obj.cargo, obj.telefone, function(err, result) {
            if(err) throw err
    
            res.redirect('/usuarios/listar')
        })
    })
}

module.exports.listar = function(app, req, res) {
    var conn = app.config.databaseConnection()
    var model = new app.app.models.UsuarioDAO(conn)

    model.total(function(err, result) {
        if(err) throw err

        var totalCount = result[0].totalCount

        var perPage = 10

        var currentPage = parseInt(req.query.page) > 1 ? parseInt(req.query.page) : 1
        var nextPage = currentPage + 1
        var previousPage = currentPage - 1
        var pageCount = Math.ceil(totalCount / perPage)
        var offset = currentPage > 1 ? previousPage * perPage : 0
        
        model.listar(perPage, offset, function(err, result) {
            if(err) throw err

            page = {
                currentPage : currentPage,
                nextPage : nextPage,
                previousPage : previousPage,
                pageCount : pageCount
            }

            res.render('usuarios/listar', {dados : result, page : page})
        })
    })
}

module.exports.pesquisar = function(app, req, res) {
    var conn = app.config.databaseConnection()
    var model = new app.app.models.UsuarioDAO(conn)
    var obj = req.body.obj

    model.pesquisar(obj, function(err, result) {
        if(err) throw err

        res.render('usuarios/listar', {dados : result})
    })
}