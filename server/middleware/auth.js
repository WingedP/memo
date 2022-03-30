import jwt from 'jsonwebtoken';

const auth = async (req, res, next) => {
    try {
        // get token from header
        const token = req.headers.authorization.split(' ')[1]; // authorization no cap / always lowercase

        // check if token is from google or custom
        const isCustomAuth = token.length < 500;
        let decodedData;

        if (token && isCustomAuth) {
            decodedData = jwt.verify(token, 'test'); // after verify, seem like jwt will give back username, id, user's info in general
            req.userId = decodedData?.id;
        } else {
            decodedData = jwt.decode(token);
            req.userId = decodedData?.sub; // sub is kind of google's id
        }

        next();

    } catch (error) {
        console.log(error);
    }
};

export default auth;