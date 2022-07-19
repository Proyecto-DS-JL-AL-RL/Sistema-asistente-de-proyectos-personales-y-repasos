import { CognitoUserPool } from "amazon-cognito-identity-js";
require('dotenv').config();

const REACT_APP_COGNITO_KEY = process.env.REACT_APP_COGNITO_KEY;
const REACT_APP_COGNITO_POOL = process.env.REACT_APP_COGNITO_POOL

const poolData = {
    UserPoolId: REACT_APP_COGNITO_POOL,
    ClientId: REACT_APP_COGNITO_KEY
}

export default new CognitoUserPool(poolData);