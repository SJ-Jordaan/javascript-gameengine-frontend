const API_URL = 'https://game-engine-api.herokuapp.com/'

const getApiRoot = () => {

  fetch(API_URL).then(res => {
    return res.json();
  }).then(res => {
    let main = document.getElementsByTagName('main');
    main[0].innerHTML(res);
  });

}

getApiRoot();