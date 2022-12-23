module.exports = (req, res, next) => {
    try {
        if(req.session.user){
            console.log('0000', req.session)
            res.redirect('/question-answer-choose')
        }
        else{
            console.log('1111')
            next()
        }
    } catch (error) {
        console.log('2000');
        res.redirect('/question-answer-login')
    }
}