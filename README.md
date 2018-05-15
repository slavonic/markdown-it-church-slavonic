# Church Slavonic flavor of Markdown

An extension to `markdown-it` engine that adds Church Slavonic syntax features.

## Features

### Emphasis becomes red (kinvar color)

Markdown emphasis is now typeset with red font (not italic).

```
*Слава и ныне*
```

### Strong (bold) spans are wide

Markdown string emphasis is typeset with wide font (expanded).

```
__Глас а__
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
((а))Господи не введи меня в напасть. ((в))Господи даждь мне мысль благу.
```

### More to come

## Programmatic use

```
const md = new require('markdown-it')();
const cuPlugin = require('markdown-it-chutch-slavonic');

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

* 0.0.1 Initial release