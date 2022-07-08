import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
    UserPoolId: "sa-east-1_BVMyM4nuc",
    ClientId: "7f33o2su17gcf7v28u20aos4n5"
}

export default new CognitoUserPool(poolData);