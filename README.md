# bookshelf-postgis
[![NPM Version][npm-image]][npm-url] [![Build Status][build-image]][build-url] [![Dependency Status][depstat-image]][depstat-url] [![Dev Dependency Status][devdepstat-image]][devdepstat-url]

Bookshelf plugin for PostGIS to automatically parse and serialize geometry/geography columns on fetch and save, respectively. Geography columns are parsed to arrays (`[lon, lat]`), and geometry columns are parsed to GeoJSON.

***NOTE:*** Geography columns must already be WGS 84 lon lat (SRID:4326)!

## Installation

```javascript
npm install bookshelf-postgis --save
```

## Usage

Apply the plugin:
```javascript
bookshelf.plugin('bookshelf-postgis');
```

And add `geography` or `geometry` columns to your model:
```javascript
const User = bookshelf.Model.extend({
  tableName: 'users',
  geography: ['location'],
  geometry: ['geometry']
});
```

[build-url]: https://travis-ci.org/joshswan/bookshelf-postgis
[build-image]: https://travis-ci.org/joshswan/bookshelf-postgis.svg?branch=master
[depstat-url]: https://david-dm.org/joshswan/bookshelf-postgis
[depstat-image]: https://david-dm.org/joshswan/bookshelf-postgis.svg
[devdepstat-url]: https://david-dm.org/joshswan/bookshelf-postgis#info=devDependencies
[devdepstat-image]: https://david-dm.org/joshswan/bookshelf-postgis/dev-status.svg
[npm-url]: https://www.npmjs.com/package/bookshelf-postgis
[npm-image]: https://badge.fury.io/js/bookshelf-postgis.svg
