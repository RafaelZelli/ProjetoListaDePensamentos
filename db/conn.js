// Criando conexão com o Banco de Dados:
const {Sequelize} = require('sequelize')  //Importa o Sequelize

//Inicia a variavel que conecta no banco 'toughts2' com usuário de 'root' e senha vazia  ''  
const sequelize = new Sequelize('toughts2', 'root', '',{
    host: 'localhost',
    dialect: 'mysql',
})

try{
    sequelize.authenticate()
    console.log('Conectamos com sucesso!')
}catch(err){
    console.log(`Não foi possível conectar: ${err}`)
}

module.exports = sequelize    //Importar o módulo

