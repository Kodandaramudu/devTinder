const authAdmin = (req, res,next) => {
    const token="xyz";
    const isAdminAuthorized = token ==="xyz";
    if(!isAdminAuthorized){
        console.log("not Authorized admin");
        res.status(401).send("unAuthorized Admin");
    }
else{
console.log("why didn't you check me😵");
next();
}}

const authUser = (req, res,next) => {
    const token="ghf";
    const isAdminAuthorized = token ==="ghf";
    if(!isAdminAuthorized){
        console.log("not Authorized user");
        res.status(401).send("unAuthorized User");
    }
else{
    console.log("did u check me!!");
next();
}}

    module.exports = {
        authAdmin,
        authUser
    }