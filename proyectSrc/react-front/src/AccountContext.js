import React,{ createContext } from "react";

import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import UserPool from './userPool';


const AccountCon = function(props){
    const [sessionState,setSessionState] = React.useState({});
    const [currentState,setCurrentState] = React.useState({});

    const authenticate = async(username,password) => {
        return await new Promise((resolve,reject)=>{            
            const user = new CognitoUser({  Username: username,   Pool: UserPool });
            const authDetail = new AuthenticationDetails({ Username: username, Password: password });
            user.authenticateUser(authDetail,{
                onSuccess: (data)=>{
                    //console.log(data);
                    user.getUserAttributes((err,atri)=>{
                        let atris = {};
                        atri.forEach((elem)=>{
                            atris[elem.Name] = elem.Value;
                            //console.log(elem.Name, elem.Value);
                        });
                        //console.log(atris);
                        setSessionState(atris);
                    });
                    resolve(data);
                },
                onFailure: (data)=>{
                    //console.error(data);
                    reject(data);
                },
                newPasswordRequired: (data)=>{
                    //console.log(data);
                    resolve(data);
                }
            });
        });
    }

    const getSession = async()=>{
        return await new Promise((resolve,reject)=>{
            const user = UserPool.getCurrentUser();
            if (user){
                user.getSession((err,session)=>{
                    if(err){
                        reject(err);
                    }else{
                        user.getUserAttributes((err,atri)=>{
                            let atris = {};
                            atri.forEach((elem)=>{
                                atris[elem.Name] = elem.Value;
                                //console.log(elem.Name, elem.Value);
                            });
                            //console.log(atris);
                            setSessionState(atris);
                            resolve(atris);
                        });                        
                    }
                });
            }else{
                reject();
            }
        });
    };

    const logout = ()=>{
        const user = UserPool.getCurrentUser();
        if(user){
            user.signOut();
            setSessionState({});
        }
    }

    return(
        <AccountContext.Provider value = {{authenticate , getSession , logout , sessionState , setSessionState , currentState,setCurrentState}}>
            {props.children}
        </AccountContext.Provider>
    );


}

const AccountContext = createContext();
export { AccountCon, AccountContext};