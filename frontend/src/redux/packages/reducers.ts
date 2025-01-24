import { IPackageAction } from "./actions";
import { IPackageState, PackageState } from "./state";

const initialState: IPackageState = {
  packageItems: [],
};

export const packageReducers = (
  state: IPackageState = initialState,
  action: IPackageAction
): IPackageState => {
  switch (action.type) {
    case "@@Package/GOT_PACKAGES_INFO":
      const newPackage: PackageState[] = [...action.data];
      return {
        ...state,
        packageItems: newPackage,
      };

    case "@@Package/ADD_CREDIT":
      return {
        ...state,
      };

    default:
      return state;
  }
};
