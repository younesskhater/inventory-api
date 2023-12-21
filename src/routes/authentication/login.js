const { User } = require('../../db/sequelize')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const privateKey = require('../../authentication/private-key')

module.exports = (app) => {
    app.post('/api/login', (req, res) => {
        console.log(' ******* Authent ***** > ', req.body)
        User.findOne({ where: 
            { email: req.body.email }
        }).then(user => {
            console.log('********* USER Found ******')
            
            if (user) {
                bcrypt.compare(req.body.password, user.password)
                    .then(isPasswordValid => {
                        if(!isPasswordValid) {
                            return res.status(401).json({ message: 'the combination email or password is incorrect' })
                        }

                        // JWT
                        const token = jwt.sign(
                            {userId: user.id},
                            privateKey,
                            { expiresIn: '24h'}
                        )
                        const { password, ...userData } = user.toJSON();
                        return res.status(200).json({ message: 'authenticated successufully', userData,  token })
                    })
                    .catch(error => {
                        return res.status(500).json({message: 'We coundn\'t authenticate you, please try later', error })
                    })
            } else {
                return res.status(401).json({ message:'the combination email or password is incorrect' })
            }
        })
        .catch(error => {
            return res.status(500).json({message: 'We coundn\'t authenticate you, please try later', error })
        })
    })
}

// curl --header "Content-Type: application/json" --request POST --data '{"email":"you@gmail.com","password":"123"}' http://localhost:3000/api/login
