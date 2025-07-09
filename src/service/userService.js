
import mysql from 'mysql2'
import bcrypt from 'bcryptjs'

const salt = bcrypt.genSaltSync(10)

// create connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'jwt'
})

const hashUserPassword = (userPassword) => {
    let hashedPassword = bcrypt.hashSync(userPassword, salt)
    return hashedPassword
}

const createNewUser = (email, password, username) => {
    let hashedPassword = hashUserPassword(password)

    connection.query(
        // `INSERT INTO users (email, password, username) VALUES ("${email}", "${password}", "${username}")`,
        'INSERT INTO users (email, password, username) VALUES (?, ?, ?)', [email, hashedPassword, username]
    )

    // connection.query(
    //     'SELECT * FROM users',
    //     (err, result, fields) => {
    //         console.log(result)
    //     }
    // )
}

const getUsersList = () => {
    let users = []

    connection.query(
        'SELECT * FROM users',
        (err, result, fields) => {
            users = result
        }
    )
}

module.exports = {
    createNewUser,
    getUsersList
}