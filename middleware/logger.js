
module.exports = (req, res, next) => {
    const time = new Date().toLocaleTimeString();

    console.log(req.method, time, res.statusCode);
    next();
}
