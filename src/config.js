const domain = window.location.hostname;
const port = 9000;
let ngrokToken = '';
if(window.location.search){
  let searchOptions = window.location.search.slice(1).split('=');
  if(searchOptions[0] === 'ngrok' && searchOptions[1]){
    ngrokToken = searchOptions[1]
  }
}
if(ngrokToken){
  module.exports = {
    url : 'https://' + ngrokToken + '.ngrok.io',
  }
}else{
  module.exports = {
    url : 'http://' + domain + ':' + port,
  }
}
