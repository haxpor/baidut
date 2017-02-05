# baidut
Baidu translator for NodeJS and Browser with Promise ready.

# Installation

Install it via `npm install baidut`.

# Usage

You need to prepare Baidu environment first before making a call to translate.

```javascript
Baidut.builder
    .setAppId("2015063000000001")
    .setKey("12345678")
    .build();
```

Then translate it via

```javascript
Baidut.translate('苹果')
  .then((result) => {
  	console.log("translated text: " + result.trans_result[0].dst);
  }, (e) => {
  	console.log(e.code + ": " + e.message);
  });
```

There are options you can set when translate too.

```javascript
Baidut.translate('สวัสดี', { http_request: true, from_lang: "th", to_lang: "en" })
	.then((result) => {
		console.log("translated text: " + result.trans_result[0].dst);
	}, (e) => {
		console.log(e.code + ": " + e.message);
	});
```

Above set `http_request=true` to force it to make a request via HTTP protocol, and set `from_lang="th"` to mark that the source langauge is Thai, and `to_lang="en"` to mark the result we want in English.

# Note on Browser

As you likely to involve translating Unicode language as well thus defining that your HTML file has UTF-8 encoding is important to have conistency in displaying proper text for non-English language.

```html
<head>
...
<meta charset="UTF-8">
...
</head>
```

# Document

You can look [here](https://haxpor.github.io/baidut/) for document reference.
Error code built-in for baidut can be seen [here](https://haxpor.github.io/baidut/Baidut.const.html#.cst.errorCode__anchor) so you could have better error handling on your application by checking which code for which error.

# License

MIT. See and understand license [here](https://github.com/haxpor/baidut/blob/master/LICENSE).
