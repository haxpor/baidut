# baidut
Baidu translator for NodeJS and Browser with Promise ready.

On browser, it will make a new request via [JSONP](https://en.wikipedia.org/wiki/JSONP) as Baidu doesn't support [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS). It offers option to be set either to request for Baidu's HTTP, or HTTPS URL end-point.

On NodeJS, it will make a new request via normal NodeJS's http|https module with options to be set either to go with GET or POST request, and either request for Baidu's HTTP, or HTTPS URL end-point.

# Installation

Install it via `npm install baidut`.

For browser, you can execute `npm run build` to create distribution fies in `./dist` directory.  
Then inside your `.html` file of your project, you can include it via

```javascript
<script src="dist/Baidut.min.js"></script>
```

# Usage

## NodeJS

Include it in your project by

```javascript
var Baidut = require('Baidut');
```

Prepare Baidu environment first before making a call to translate.

```javascript
Baidut.builder
    .setAppId("2015063000000001")
    .setKey("12345678")
    .build();
```

> appId=`2015063000000001`, and key=`12345678` is working app id and key for Baidu's demo app.
> You can test using them first.

Then translate it via <sub>[default to translate from Chinese to English]</sub>

```javascript
Baidut.translate('苹果')
  .then((result) => {
  	console.log("translated text: " + result.trans_result[0].dst);
  }, (e) => {
  	console.log(e.code + ": " + e.message);
  });
```

Above will translate input text from Chinese to English with POST method of HTTPS request on NodeJS. For browser, it goes with GET method with HTTPS request via JSONP on browser.

You set options via

```javascript
Baidut.translate('สวัสดี', { http_request: true, get_method: true, from_lang: "th", to_lang: "en" })
	.then((result) => {
		console.log("translated text: " + result.trans_result[0].dst);
	}, (e) => {
		console.log(e.code + ": " + e.message);
	});
```

Above set `http_request=true` to force it to make a request via HTTP protocol, `get_method=true` <sub>only available on NodeJS</sub> to force it to use GET method for request, and set `from_lang="th"` to mark that the source langauge is Thai, and `to_lang="en"` to mark the result we want in English.  

See list of language support at [official document](http://api.fanyi.baidu.com/api/trans/product/apidoc).

# Set Charset on Browser

As you likely to involve translating Unicode language as well thus defining that your HTML file has `UTF-16` encoding is important to have conistency in displaying proper text for non-English language.

Please note that HTML4 support only `UTF-8`, but HTML5 support both `UTF-8` and `UTF-16`.

```html
<head>
...
<meta charset="UTF-16">
...
</head>
```

# Developers

There are commands available for development, build documents, build distribution files, and others.

* `npm run build` - to build a distribution files (included es5-dev, es6, es2015, and minfied version)
* `npm run docs` - to generate document in `./docs` directory. Not that it uses JSDoc from comment in code.
* `npm test` - to run tests for both NodeJS and Browser.

# Document

* [Reference document](https://haxpor.github.io/baidut/)
* [Error code](https://haxpor.github.io/baidut/Baidut.const.html#.cst.errorCode__anchor) as returned in Promise-function **not** included HTTP status code. But error code will be returned via `e.code`.

# License

MIT. See and understand license [here](https://github.com/haxpor/baidut/blob/master/LICENSE).
