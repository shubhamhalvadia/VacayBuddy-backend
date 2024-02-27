const jwt = require('jsonwebtoken');
const { redisConnect } = require('../util/redis');

module.exports = (req, res, next) => {
    const authHeader = req.get('Authorization');
    if (!authHeader) {
      const error = new Error('Not authenticated.');
      error.statusCode = 401;
      throw error;
    }
    const token = authHeader.split(' ')[1];

    const blackListTokens = redisConnect
                            .then(client => {
                                return client.get('blacklisttokens');
                            })
                            .catch(err => {
                                throw err;
                            });
    
    blacklistTokensArray = JSON.parse(blackListTokens);
    
    if (token in blacklistTokensArray) {
        const error = new Error('Not authenticated.');
        error.statusCode = 401;
        throw error;
    }
    
    let decodedToken;

    try {
        decodedToken = jwt.verify(token, 'somesuperprojectsecret');
    } catch(err) {
        err.statusCode = 500;
        throw err;
    }
    if(!decodedToken) {
        const error = new Error('Not authenticated.');
        error.statusCode = 401;
        throw error;
    }
    req.userId = decodedToken.userId;
    next();
}