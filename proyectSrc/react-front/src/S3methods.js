require('dotenv').config();
const { CognitoIdentityClient } = require("@aws-sdk/client-cognito-identity");
const { fromCognitoIdentityPool,} = require("@aws-sdk/credential-provider-cognito-identity");
const { S3Client, ListObjectsCommand,PutObjectCommand } = require("@aws-sdk/client-s3");


const REACT_APP_REGION = process.env.REACT_APP_REGION;
const REACT_APP_POOL_ID = process.env.REACT_APP_POOL_ID;
const REACT_APP_S3_PATH = process.env.REACT_APP_S3_PATH;
const REACT_APP_S3_FILEPATH = process.env.REACT_APP_S3_FILEPATH;
const REACT_APP_BUCKET_NAME = process.env.REACT_APP_BUCKET_NAME;

const s3Client = new S3Client({
  region: REACT_APP_REGION,
  credentials: fromCognitoIdentityPool({
    client: new CognitoIdentityClient({ region: REACT_APP_REGION }),
    identityPoolId: REACT_APP_POOL_ID, // IDENTITY_POOL_ID e.g., eu-west-1:xxxxxx-xxxx-xxxx-xxxx-xxxxxxxxx
  }),
});

const parseUrlFromKey = function(key){
    return REACT_APP_S3_PATH+String(key);
}

const getFileKey = function(filename){
    return REACT_APP_S3_FILEPATH+filename;
}

const genTimeStamp  = ()=>{
    const dt = new Date();
    const res = String(dt.getHours())+String(dt.getMinutes())+String(dt.getFullYear())+String(dt.getMonth())+String(dt.getDay());
    return res;
}

const uploadFile = function async (file){
    return new Promise(async (resolve,reject)=>{
        if (file){
            const dt = genTimeStamp();
            const fileName = dt+file.name;
            const photoKey = REACT_APP_S3_FILEPATH +fileName;
            const uploadParams = {
                Bucket: REACT_APP_BUCKET_NAME,
                Key: photoKey,
                Body: file
                };
            const data01 = await s3Client.send(new PutObjectCommand(uploadParams))
                .catch(err=>{
                    console.log(err);
                    reject("Hubo un error "+err);
                });
            resolve(photoKey);
        }
        reject(null);
    });
}

export {s3Client,parseUrlFromKey,getFileKey,uploadFile};