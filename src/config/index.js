import dotenv from 'dotenv'
dotenv.config()

export const config = {
    secret: process.env.SECRET,
    hostDB: process.env.HOST_DB,
    userDB: process.env.USER_DB,
    passDB: process.env.PASS_DB,
    portDB: process.env.PORT_DB,
    nameDB: process.env.NAME_DB,
    urlDB: process.env.URL_DB,
};