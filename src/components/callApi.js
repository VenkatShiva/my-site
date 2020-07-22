import { url } from '../config';
const settings = {
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
        'Content-Type': 'application/json',
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
}
let callService;
function getConfig(method,data){
    method = method.toUpperCase();
    switch(method){
        case 'POST': return Object.assign({},settings,{ method, body: JSON.stringify(data) });
        case 'GET':
        default:
            return Object.assign({}, settings, { method });
    }
}
if(window.fetch){
    callService = async function(api = '/', method = 'GET' , data = {}){
        // debugger;
        const urlToCall = "/api"+api;
        const callConfig = getConfig(method, data);
        try{
            const response  = await fetch( urlToCall, callConfig );
            if(response.ok){
                return { status: true, result: await response.json() };
            }else{
                console.log(response);
                return { status: false };
            }
        }catch(err){
            console.log(err);
            return { status : false };
        }
    }
}else{
    callService = async function(api = '/', method = 'GET' , data = {}){
        const urlToCall = url + api;
        let callConfig = getConfig(method, data);
        callConfig = Object.assign({},callConfig, { url: urlToCall, });
        // console.log(response);
        try{
            // eslint-disable-next-line no-undef
            const response = await $.ajax(callConfig);
            console.log(response)
        }catch(err){
            console.log(err);
            return false;
        }
    }
}

const callApi = function(url, method, data){
    return callService(url, method, data);
}

const isLoggedIn = async function(){
    const response =  await callApi('/','GET');
    if(response.status){
        switch(response.result.result){
            case 'Ok':
                return {
                    status: 200,
                    login: true,
                }
            case 'tockenExpired':
                return {
                    status: 200,
                    login: false,
                    tockenExpired: true
                }
            case 'unauthrized':
            default:
                return {
                    status: 200,
                    login: false,
                }
        }
    }else{
        return {
            status: 502,
            login: false
        }
    }
}
const logout = async () => {
    const response =  await callApi('/auth/logout','GET');
    if(response.status){
        switch(response.result.result){
            case 'loggedOut':
                return {
                    status: 200,
                    logout: true,
                }
            default:
                return {
                    status: 200,
                    logout: false,
                }
        }
    }else{
        return {
            status: 502,
            login: false
        }
    }
}

export default {
  callApi,
  isLoggedIn,
  logout
}