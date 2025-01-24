import { PackageState } from "./state";

export function gotPackagesInfo(data: PackageState[]) {
  return {
    type: "@@Package/GOT_PACKAGES_INFO" as const,
    data,
  };
}

export function addCredit() {
  return {
    type: "@@Package/ADD_CREDIT" as const,
  };
}

export type IPackageAction =
  | ReturnType<typeof gotPackagesInfo>
  | ReturnType<typeof addCredit>;
