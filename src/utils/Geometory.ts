export type Pixel = Branded<number, 'Pixel'>;
export type Grid = Branded<number, 'Grid'>;

export type AxisX<N extends number> = Branded<N, 'AxisX'>;
export type AxisY<N extends number> = Branded<N, 'AxisY'>;

export type UnitOfLength = Pixel | Grid;

export type Rectangle<U extends UnitOfLength> = {
  x: AxisX<U>;
  y: AxisY<U>;
};

export type Vec2D<U extends UnitOfLength> = {
  x: AxisX<U>;
  y: AxisY<U>;
};

export type Point2D<U extends UnitOfLength> = {
  x: AxisX<U>;
  y: AxisY<U>;
};

export type Area<U extends UnitOfLength> = {
  position: Point2D<U>;
  size: Rectangle<U>;
};

export type Degree = Branded<number, 'Degree'>;

export type Angle = Degree;
