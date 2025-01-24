export interface PackageState {
  price: number;
  name: string;
  credit: number;
  id: number;
}

export interface IPackageState {
  packageItems: PackageState[];
}
