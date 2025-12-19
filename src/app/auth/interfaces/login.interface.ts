export interface loginResponse{
    mensaje:string,
    ok:string,
    token:string,
    usuario:userData
}
interface userData{
    username:string
}