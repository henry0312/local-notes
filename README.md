# local-notes.js

local-notes.js allows you to view local notes in Markdwon on your browser.

## NOTICE

Don't publish notes with local-notes.js on your public server, because of possibility of [Directory traversal attack](http://en.wikipedia.org/wiki/Directory_traversal_attack).

## Requirements

* [jQuery](http://jquery.com/) v2.0 or later.
* [marked](https://github.com/chjj/marked)
* [Bootstrap](http://getbootstrap.com/) v3.0 or later (required for sample).

### For Google Chrome users

Google Chrome doesn't load local file by default due to security reason. Therefore, you need to launch Google Chrome with `--allow-file-access-from-files` option.

## Usage

1. Create a template viewer html
2. Create viewer.md to be initially loaded  
   **The file name (not including the extension) is required to be identical with the template viewer html.**
3. Load jquery.js in the template viewer
4. Load marked.js in the template viewer
5. Load local-notes.js in the template viewer
6. Make your notes in Markdown!

## ToDo

* Support refresh by reloading

## Licence

MIT License  
Copyright (c) 2013 Tsukasa ŌMOTO

a.k.a. [@henry0312](https://twitter.com/henry0312)

## Special Thanks To

* Takashi Hirata ([@silverfilain](https://twitter.com/silverfilain))  
  He helped me a lot.
* Hiroki Taniura ([@boiled_sugar](https://twitter.com/boiled_sugar))  
  I had my Enlgish translation corrected.  
* Ikuya AWASHIRO ([@ikunya](https://twitter.com/ikunya))  
  He performed a simple test on Ubuntu and Android.