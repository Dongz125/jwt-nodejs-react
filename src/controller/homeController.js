
import userService from '../service/userService'

const handleHelloWorld = (req, res) => {
    const name = 'HVKhai'
    return res.render('home.ejs', { name });
}

const handleUserPage = (req, res) => {
    return res.render('user.ejs')
}

const handleCreateNewUser = (req, res) => {
    let email = req.body.email
    let password = req.body.password
    let username = req.body.username

    userService.createNewUser(email, password, username)
}

module.exports = {
    handleHelloWorld,
    handleUserPage,
    handleCreateNewUser
}