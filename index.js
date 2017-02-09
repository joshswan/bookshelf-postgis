/*!
 * Bookshelf-PostGIS
 *
 * Copyright 2017 Josh Swan
 * Released under the MIT license
 * https://github.com/joshswan/bookshelf-postgis/blob/master/LICENSE
 */

const wkx = require('wkx');

module.exports = (bookshelf) => {
  const BaseModel = bookshelf.Model;

  bookshelf.Model = BaseModel.extend({
    format(attributes) {
      // Convert geography attributes to raw ST_MakePoint calls with [lon, lat] as bindings
      if (this.geography) {
        this.geography.forEach((attr) => {
          if (attributes[attr]) attributes[attr] = bookshelf.knex.raw('ST_SetSRID(ST_MakePoint(?, ?), 4326)::geography', attributes[attr]);
        });
      }

      // Convert geometry attributes to raw ST_GeomFromGeoJSON and stringify GeoJSON attributes
      if (this.geometry) {
        this.geometry.forEach((attr) => {
          if (attributes[attr]) attributes[attr] = bookshelf.knex.raw('ST_GeomFromGeoJSON(?)', [JSON.stringify(attributes[attr])]);
        });
      }

      // Call parent format method
      return BaseModel.prototype.format.apply(this, [attributes]);
    },

    parse(attributes) {
      // Parse geography columns to [lon, lat]
      if (this.geography) {
        this.geography.forEach((attr) => {
          if (attributes[attr]) attributes[attr] = wkx.Geometry.parse(Buffer.from(attributes[attr], 'hex')).toGeoJSON().coordinates;
        });
      }

      // Parse geometry columns to GeoJSON
      if (this.geometry) {
        this.geometry.forEach((attr) => {
          if (attributes[attr]) attributes[attr] = wkx.Geometry.parse(Buffer.from(attributes[attr], 'hex')).toGeoJSON();
        });
      }

      // Call parent parse method
      return BaseModel.prototype.parse.apply(this, [attributes]);
    },
  });
};
