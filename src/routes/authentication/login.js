const { User } = require('../../db/sequelize')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const privateKey = require('../../authentication/private-key')

module.exports = (app) => {
    app.post('/api/login', (req, res) => {
        
        User.findOne({ where: 
            { email: req.body.email }
        }).then(user => {
            if (user) {
                bcrypt.compare(req.body.password, user.password)
                    .then(isPasswordValid => {
                        if(!isPasswordValid) {
                            return res.status(401).json('the combination email or password is incorrect')
                        }

                        // JWT
                        const token = jwt.sign(
                            {userId: user.id},
                            privateKey,
                            { expiresIn: '24h'}
                        )
                        const { password, ...data } = user.toJSON();
                        console.log(user)
                        return res.json({ message: 'authenticated successufully', data,  token })
                    })
            } else {
                res.status(401).json('the combination email or password is incorrect')
            }
        })
        .catch(error => {
            return res.json('We coundn\'t authenticate you, please try later', error)
        })
    })
}