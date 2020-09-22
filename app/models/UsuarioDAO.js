function UsuarioDAO(connection) {
    this._connection = connection
}

UsuarioDAO.prototype.cadastrar = function(obj, callback) {
    this._connection.query('insert into usuario set ?', obj, callback)
}

UsuarioDAO.prototype.deletar = function(id, callback) {
    this._connection.query('delete from usuario where id_user = '+id, callback)
}

UsuarioDAO.prototype.editar = function(id, email, senha, nome, sobrenome, data_nasc, rg, cargo, telefone, callback) {
    this._connection.query('update usuario set email = "'+email+'", senha = "'+senha+'", nome = "'+nome+'", sobrenome = "'+sobrenome+'", data_nasc = "'+data_nasc+'", rg = "'+rg+'", cargo = "'+cargo+'", telefone = "'+telefone+'" where id_user = '+id, callback)
}

UsuarioDAO.prototype.total = function(callback) {
    this._connection.query('select count(id_user) as totalCount from usuario', callback)
}

UsuarioDAO.prototype.listar = function(perPage, offset, callback) {
    this._connection.query('select * from usuario order by id_user desc limit '+perPage+' offset '+offset, callback)
}

UsuarioDAO.prototype.pesquisar = function(obj, callback) {
    this._connection.query('select * from usuario where nome like "%'+obj+'%" or sobrenome like "%'+obj+'%" or rg like "%'+obj+'%" or cpf like "%'+obj+'%" or email like "%'+obj+'%" or cargo like "%'+obj+'%" or telefone like "%'+obj+'%"', callback)
}

UsuarioDAO.prototype.pesquisarId = function(id, callback) {
    this._connection.query('select * from usuario where id_user = '+id, callback)
}

UsuarioDAO.prototype.pesquisarVeterinarios = function(callback) {
    this._connection.query('select * from usuario where cargo like "%eteri%"', callback)
}

module.exports = function() {
    return UsuarioDAO
}