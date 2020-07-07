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

function toColorObject(color) {
  const { r, g, b } = color;
  return {
    hexes: [
      `#${toHex(r)}${toHex(g)}${toHex(b)}`,
      `#${toHex(r + 32)}${toHex(g + 32)}${toHex(b + 32)}`,
      `#${toHex(r + 64)}${toHex(g + 64)}${toHex(b + 64)}`
    ],
    rgb: `(${r},${g},${b})`
  }
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
  let { quantity, hueOptions } = queryOptions;
  hueOptions.use = hueOptions.use === 'true';
  if (!hueOptions.use) {
    return randomColors(quantity).map(toColorObject);
  } else {
    return randomColorsHue(hueOptions, quantity).map(toColorObject);
  }
}

module.exports = {
  chooseColors: chooseColors
}
