import { RegisterState } from "./state"

export function registerAccount(data: RegisterState[]){
    return {
        type: "@@REGISTER/ACCOUNT" as const,
        data
    }
}
export type IRegisterAction =

    | ReturnType<typeof registerAccount>