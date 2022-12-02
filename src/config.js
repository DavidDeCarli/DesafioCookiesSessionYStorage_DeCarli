export default {
    PORT: process.env.PORT || 8080,
    mongoLocal: {
        client: 'mongodb',
        cnxStr: 'mongodb://localhost:27017/coderhouse'
    },
    mongoRemote: {
        client: 'mongodb',
        cnxStr: 'mongodb+srv://daviddc488:coder123@CoderHouse.beyxfsg.mongodb.net/?retryWrites=true&w=majority',
    },
    sqlite3: {
        client: 'sqlite3',
        connection: {
            filename: `./DB/ecommerce.sqlite`
        },
        useNullAsDefault: true
    },
    mariaDB: {
        client: 'mysql',
        connection: {
            host: '127.0.0.1',
            port: 3306,
            user: 'root',
            database: 'ecommerce'
        }
    },
    fileSystem: {
        path: './DB'
    }
}

// datos anteriores
// const path = require('node:path');

// module.exports = {
//     mariaDB: {
//         client: 'mysql',
//         connection: {
//             host: '127.0.0.1',
//             port: 3306,
//             user: 'root',
//             database: 'ecommerce'
//         }
//     },
//     sqlite: {
//         client: 'sqlite3',
//         connection: {
//             filename: path.resolve(__dirname, './../../../DavidSQLite.db'),
//         }
//     }
// };