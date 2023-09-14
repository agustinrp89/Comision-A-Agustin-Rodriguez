module.exports = {
    HOST: process.env.Mysqlhost ,
    USER: process.env.Mysqlusername,
    PASSWORD: process.env.Mysqlpassword,
    DB: process.env.Mysqldatabase,
    dialect:'mysql',

    pool:{
        max:5,
        min:0,
        acquire:30000,
        idle:10000
    }
}