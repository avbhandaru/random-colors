// the https://cors-anywhere.herokuapp.com/ avoids CORS errors
const CORS = "https://cors-anywhere.herokuapp.com/";
const API = "https://random-colors.herokuapp.com/api/colors";

$(document).ready(() => {
  // Get input and form API call

  // Test API reqBody
  const reqBody = {
    quantity: 3,
    hueOptions: {
      use: true,
      set: {
        channel: 'r',
        value: 140
      },
      pref: {
        channel: 'b',
        range: {
          low: 250,
          high: 256
        }
      }
    }
  };
  console.log('req body', reqBody);

  $.getJSON(CORS + API, reqBody, (resBody, textStatus) => {
    console.log(textStatus, resBody);
  });

});
