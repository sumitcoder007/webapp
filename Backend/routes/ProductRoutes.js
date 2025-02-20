
const ensureAuthentication = require('../middelware/Auth');

const router = require('express').Router();

router.get('/', ensureAuthentication, (req, res)=>{
    console.log('---logged in user details---', req.user);
    return res.status(200).json([
        {
            name: 'mobile',
            price:10000
        },
        {
            name: 'laptop',
            price:20000
        }
    ]);
})

module.exports = router;