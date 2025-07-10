import mysql from 'mysql2/promise'

const createConnection = async () => {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'jwt'
    })
    
    return connection
}

export default createConnection;
