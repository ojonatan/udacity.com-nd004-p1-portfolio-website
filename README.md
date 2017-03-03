# FSND P1 - Portfolio Website Project

A Portfolio Site based on a design mockup PDF

## Highlights

* Using `<picture>` tags for all images (of significant size) to utilize
native responsive image loading strategy of the browser. I preferred this over
the use of `background` images, those being more problematic to load responsively.
I had to tackle sizing and popup issues in return.

* Featuring cropped images for smaller viewport, resized for larger. See the
banner image.

* Ellipsis feature to symbolize clipped texts

* Complete *Grunt* workflow to streamline all relevant tasks, e.g. image
optimization, CSS and JS optimization

* Python tool to generate portfolio items from a JSON file. Helps to eliminate
redundant sources

* Equalizer fixes article heights tackling the problem of `onload` events
not fired for cached images

## Know limitations

* Ellipsis doesn't respond to short texts. Neither *Clamp.js* (Firefox issues) nor
the straight CSS choice (missing autodetection for short texts) brought a solution.
I have simply stepped up verbosity to tackle that. Not satisfying.

* Node.js might totally block the sytem eating 100% cpu, at least on my
Windows 7 Professional. Switching to *Gulp* felt out of scope given the focus
of this project.

* Less watcher is painfully slow on my Laptop. 20 seconds from changing .less
files until live reload kicks in.

## Installation

```
npm install
bower install
grunt server
```

## Version

2017-03-03T11:50:34.920000