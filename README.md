# Church Slavonic flavor of Markdown
[![Build Status](https://travis-ci.org/slavonic/markdown-it-church-slavonic.svg?branch=master)](https://travis-ci.org/slavonic/markdown-it-church-slavonic)
[![Coverage Status](https://coveralls.io/repos/github/slavonic/markdown-it-church-slavonic/badge.svg?branch=master)](https://coveralls.io/github/slavonic/markdown-it-church-slavonic?branch=master)

An extension to `markdown-it` engine that adds Church Slavonic syntax features.

## Features

### Use `=` to mark red (kinvar color)


```
=Слава и ныне=
```

### Use `+` to mark wide text (stretched)

```
+Глас а+
```

### Leading tilda makes first letter red

```
~Въ едину от суббот...
```

### Leading circumflex makes first letter "bukvitsa"

```
^Въ едину от суббот...
```

### Page anchors

When page label is the same as page number:
```
Господи помилуй<<1>>
```

When page label is different:
```
Господи помилуй<<1: а>>
```

### Margin verse anchors

```
{{а}}Господи не введи меня в напасть. {{в}}Господи даждь мне мысль благу.
```

### More to come

## Programmatic use

```
var md = new require('markdown-it')();
var cuPlugin = require('markdown-it-chutch-slavonic');

md.use(cuPlugin);

var out = md.render('Hello, ~Red World')
console.log(out)

out = md.render('~Red World')
console.log(out)

out = md.render('~Ꙗ҆́кѡ помо́щница ты̀ ^є҆сѝ безпомо́щныхъ человѣ́кѡвъ')
console.log(out)

out = md.render('~Ꙗ҆́кѡ {{a}} помо́щница ты̀ ^є҆сѝ <<12>>безпомо́щ<<13: huh>>ныхъ человѣ́кѡвъ')
console.log(out)
```

## Release notes

* 1.0.0 Changed the way we markup kinovar and wide (to leave bold/italic alone)
* 0.0.1 Initial release