const jwt = require('jsonwebtoken');
const { promisify } = require('util');

module.exports = async (request, response, next) => {
    const authHeader = request.headers.authorization;

    if (!authHeader) 
        return response.status(401).json({ message: 'Token not provided' });

    const [, token] = authHeader.split(' ');

    try {
        const decoded  = await promisify(jwt.verify)(token, process.env.APP_KEY);

        request.userId = decoded.id;        
    } catch (err) {
        return response.status(401).json({ message: 'Token invalid' });
    }
    
    return next();
}