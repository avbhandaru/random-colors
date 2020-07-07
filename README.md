# Random Color Generator
Made for an artistic friend who needed random colors!

Please note that form features will be added (considering using React.js for this project depending on complexity). Regardless, soon enough, a front end user will have user friendly control over the request object.

Also note, that (depending on interest) user authorization and color palette saving will be added. This will require hooking the app up to a database, which is easy given how I have organized it!

## API
All api requests should be pointed towards:
```
https://random-colors.herokuapp.com/api/colors
```

### `POST`
The request schema is as follows, followed by an example of how you might make an in-code (JS) request for it:

```js
const request = {
  quantity: Number,
  hueOptions: {
    use: Boolean,
    set: {
      channel: Enum(['r' | 'g' | 'b']),
      value: Number
    },
    pref: {
      channel: Enum('r' | 'g' | 'b'),
      range: {
        low: Number,
        high: Number
      }
    }
  }
};

fetch(url, { method:..., headers:..., body: request }) => Promise
```

The response schema is as follows:

```JSON
{
    "httpType": "GET/POST",
    "type": "RESPONSE",
    "colors": [
        {
            "hex": "#f0e3fc",
            "rgb": "(240,227,252)"
        },
        {
            "hex": "#f074fe",
            "rgb": "(240,116,254)"
        },
        {
            "hex": "#f091ff",
            "rgb": "(240,145,255)"
        }
    ]
}
```
Note that this is subject to change, as the `httpType` field makes no sense!

### `DELETE`
To be added.

## Notes
 - This is a WIP, depending on interest.
 - Setup is as a dyanmically rendered site. Backend and Frontend. While this is unnecessary, it will make it easier later if I choose to separate each end/host them on different servers.