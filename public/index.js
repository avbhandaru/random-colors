// the https://cors-anywhere.herokuapp.com/ avoids CORS errors
const CORS = ''; //"https://cors-anywhere.herokuapp.com/";
const API = "https://random-colors.herokuapp.com/api/colors";

// JQuery Helpers
function appendSwatch(color) {
  const Id = color.hex.split('#')[1];
  $('#colors').append(`
    <div id="color-${Id}" class="color-swatch">
      ${color.hex}
    </div>
    <br>
  `);
  $(`#color-${Id}`).css({
    'background': color.hex
  });
}

function removeSwatches() {
  $('#colors').empty();
}

function getSwatches() {
  // Test API reqBody
  const reqBody = {
    quantity: 3,
    hueOptions: {
      use: false, // set true if you dare
      set: {
        channel: 'r',
        value: 140
      },
      pref: {
        channel: 'b',
        range: {
          low: 220,
          high: 256
        }
      }
    }
  };

  fetch(CORS + API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(reqBody)
  })
  .then(response => response.json())
  .then(resBody => {
    const colors = resBody.colors;
    removeSwatches();
    colors.forEach(appendSwatch);
  })
  .catch(err => {
    console.log('ERROR', err)
  })
}

// On Ready
$(document).ready(() => {
  $('#button').click(() => {
    getSwatches();
  });
  getSwatches();
});
