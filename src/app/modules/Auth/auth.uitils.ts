
import jwt, { JwtPayload } from 'jsonwebtoken';



const createToken = (JwtPayload: { userId: string, role: string }, secret: string, expiresIn: string) => {

    return jwt.sign({
        data: JwtPayload
    }, secret, { expiresIn: expiresIn })

}
export default createToken

