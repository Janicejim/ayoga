import { REACT_APP_API_SERVER } from "../utils/config";

export async function getData(route: string) {
    const res = await fetch(`${REACT_APP_API_SERVER}/${route}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
    })

    const result = await res.json();

    return result

}

export async function getDataNotLogin(route: string) {
    const res = await fetch(`${REACT_APP_API_SERVER}/${route}`)

    const result = await res.json();

    return result

}


export async function postOrPatchWithMedia(method: string, route: string, formData: any) {

    const res = await fetch(`${REACT_APP_API_SERVER}/${route}`, {
        method,
        headers: {

            Authorization: `Bearer ${localStorage.getItem("token")}`,

        }, body: formData
    })

    const result = await res.json();

    return result

}

export async function postOrPatchTextForm(method: string, route: string, form: any) {

    const res = await fetch(`${REACT_APP_API_SERVER}/${route}`, {
        method,
        headers: {

            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json"

        }, body: JSON.stringify(form)
    })

    const result = await res.json();

    return result

}

export async function postPatchOrDeleteWithQueryOnly(method: string, route: string) {

    const res = await fetch(`${REACT_APP_API_SERVER}/${route}`, {
        method,
        headers: {

            Authorization: `Bearer ${localStorage.getItem("token")}`,


        }
    })

    const result = await res.json();

    return result

}

