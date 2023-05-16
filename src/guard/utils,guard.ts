import * as jwt from 'jsonwebtoken'
export function isValidJwt(token: string):boolean{
  try{
    const decoded= jwt.verify(token,'mysecretkey')
    return !!decoded
  }catch (e) {
    return false
  }
}