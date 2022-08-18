class ErrorHandler{
    static handle(error, req, res, next){
        res.json({error: error.message});
        console.log(error)
        //process.exit()
    }
}

module.exports = ErrorHandler;