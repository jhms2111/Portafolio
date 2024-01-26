const CustomersModel = require('../models/customers')
const { crypto } = require('../utils/password')

const defaultTitle = 'Cadastro de Clientes'

function index(req, res) {
    res.render('register', {
        title:defaultTitle
})
}

async function add(req, res) {
    const {
        name,
        phone,
        email,
        mensaje,
        password,
        
    } = req.body

    const passwordCrypto = await crypto(password)

    const register = new CustomersModel({
        name,
        phone,
        email,
        mensaje,
        password,
        password: passwordCrypto,
    })

    register.save()
    res.render('register', {
        title: defaultTitle,
        message: 'Cadastro realizado com sucesso!'
    })
}

async function list(req, res) {
    const users = await CustomersModel.find()
    
    res.render('list', {
        title:'Listagem e usuarios',
        users,
    })
}

async function formEdit(req, res) {
    const { id } = req.query

 const user = await CustomersModel.findById(id)

    res.render('edit', {
        title:'Editar Usuario',
        user,
    })
}

async function edit(req, res) {
    const {
        name,
        phone,
        email,
        mensaje,
    } = req.body

   const { id } = req.params

   const user = await CustomersModel.findById(id)

   user.name = name
   user.phone = phone
   user.email = email 
   user.mensaje = mensaje


   user.save()
   
   res.render('edit', {
    title: 'Editar Usuario',
    user,
    message: 'Usuario alterado com sucesso! '
   })
}

async function remove(req, res) {
    const { id } = req.params

  const remove = await CustomersModel.deleteOne({ _id: id })

  if (remove) {
    res.redirect('/list') 
  }
}

module.exports = {
    index,
    add,
    list,
    formEdit,
    edit,
    remove,
}