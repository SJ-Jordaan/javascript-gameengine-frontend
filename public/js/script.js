const API_URL = 'https://game-engine-api.herokuapp.com/'

const getApiRoot = () => {

  let element = document.getElementById('api-status');

  fetch(API_URL).then(res => {
    return res.json();
  }).then(res => {
    element.innerHTML = res;
  }).catch(error => {
    element.innerHTML = 'API could not be reached';
  });

}