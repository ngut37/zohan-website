import { enumerate } from '@utils/enumerate';

/**
 * GPS coordinates [longitude, latitude]
 * If specifying latitude and longitude coordinates, list the longitude first, and then latitude
 * (see https://www.mongodb.com/docs/manual/reference/geojson).
 */
export type Coordinates = [number, number];

export const POINT_TYPES = enumerate('Point', 'Polygon', 'LineString');

export type PointType = keyof typeof POINT_TYPES;

export type Point = {
  type: PointType; // GeoJSON point types of mongo
  coordinates: Coordinates;
};

export type Region = {
  _id: number;
  name: string;
  point: Point;
};

export type District = {
  _id: number;
  name: string;
  point: Point;
  region: Region['_id'];
};

export type Mop = {
  _id: number;
  name: string;
  point: Point;
  district: District['_id'];
};

export type PopulatedRegion = Region & {
  districts: (Omit<District, 'point' | 'district'> & {
    mops: Omit<Mop, 'point' | 'district'>[];
  })[];
};
