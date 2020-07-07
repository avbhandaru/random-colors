// Color Macros
const DEFAULT = {
  r: { low: 0, high: 256 },
  g: { low: 0, high: 256 },
  b: { low: 0, high: 256 }
};
const CHANNELS = [
  'r',
  'g',
  'b'
];

// Helpers
function getRandomInt(min, max) {
  // The maximum is exclusive and the minimum is inclusive
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function toHex(x) {
  return x < 16? `0${x.toString(16)}` : x.toString(16);
}

function toColorJSON(color) {
  const { r, g, b } = color;
  return JSON.stringify({
    hex: `#${toHex(r)}${toHex(g)}${toHex(b)}`,
    rgb: `(${r},${g},${b})`
  })
}

// Color Samplers
function randomColors(n, params = DEFAULT) {
  const { r, g, b } = params;
  let colors = [];
  for (let i = 0; i < n; i++) {
    colors.push({
      r: getRandomInt(r.low, r.high),
      g: getRandomInt(g.low, g.high),
      b: getRandomInt(b.low, b.high)
    });
  }
  return colors;
}

function randomColorsHue(hueOptions, n) {
  const { set, pref } = hueOptions;
  let params = DEFAULT;
  if (pref) {
    params[pref.channel] = {
      low: pref.range.low,
      high: pref.range.high
    }
    CHANNELS.forEach(c => {
      if (c != pref.channel) {
        params[c].high = pref.range.low;
      }
    })
  }
  if (set) {
    params[set.channel] = {
      low: set.value,
      high: set.value + 1
    }
  }
  return randomColors(n, params);
}

function chooseColors(queryOptions) {
  const { quantity, hueOptions } = queryOptions;
  if (!hueOptions.use) {
    return randomColors(quantity).map(toColorJSON);
  } else {
    return randomColorsHue(hueOptions, quantity).map(toColorJSON);
  }
}

let testOptions = {
  quantity: 3,
  hueOptions: {
    use: true,
    set: {
      channel: 'r',
      value: 240
    },
    pref: {
      channel: 'b',
      range: {
        low: 140,
        high: 256
      }
    }
  }
}

module.exports = {
  chooseColors: chooseColors
}
