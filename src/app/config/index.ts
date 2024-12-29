import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.join(process.cwd(), '.env') })
export default {
    port: process.env.PORT,
    database_url: process.env.DATABASE_URL,
    default_pass: process.env.DEFUALT_PASS,
    bcrypt_salt: process.env.BYCRYPT_SALT,
    NODE_ENV: process.env.NODE_ENV,
    jwt_access_secret: process.env.JWT_ACCESS_SECRET,

    JWT_ACCESS_EXPIRES_IN: process.env.JWT_ACCESS_EXPIRES_IN,

    JWT_REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN,

    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,

}




