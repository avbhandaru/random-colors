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

  fetch(CORS + API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(reqBody)
  })
  .then(response => response.json())
  .then(resBody => {
    console.log('SUCCESS', JSON.parse(resBody))
  })
  .catch(err => {
    console.log('ERROR', err)
  })

  // $.ajax({
  //   type: 'GET',
  //   url: CORS + API,
  //   data: JSON.stringify(reqBody),
  //   dataType: 'json',
  //   success: (resBody, status) => {
  //     if (status === 200) {
  //       console.log(status, ':', resBody);
  //     }
  //   }
  // })

});
