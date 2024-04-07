import bcrypt from 'bcrypt';
import appConfig from "../config/app";
class Cipher {
    hashString = (str: string): string => {
        const hashedString = bcrypt.hashSync(str, appConfig.cipher.saltRounds);
        return hashedString;
    }
    verifyHash = (str: string, hash: string): boolean => {
        const hashedString = bcrypt.compareSync(str, hash);
        return hashedString;
    }
}

const cipher = new Cipher();
export default cipher;
