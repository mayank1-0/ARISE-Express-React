module.exports = (req, res, next) => {
    try {
        if(req.session.user){
            console.log('0000', req.session)
            res.redirect('/staff/staff-dashboard')
        }
        else{
            console.log('1111')
            next()
        }
    } catch (error) {
        console.log('2000');
        res.redirect('/staff/staff-login')
    }
}