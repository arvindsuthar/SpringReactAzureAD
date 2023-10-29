import { graphConfig } from "./authConfig";

/**
 * Attaches a given access token to a MS Graph API call. Returns information about the user
 * @param accessToken 
 */
export async function callSpringBootForRole(accessToken) {
    const headers = new Headers();
    const bearer = `Bearer ${accessToken}`;
    headers.append("Authorization", bearer);

    const options = {
        method: "GET",
        headers: headers
    };
    let text = "";
    try {
        let response = await fetch(graphConfig.springBootAdminEndpoint, options);
        if (response.ok) {
            text = await response.text();
        }
        response = await fetch(graphConfig.springBootUserEndpoint, options);
        if (response.ok) {
            text += await response.text();
        }
    }
    catch (error) {
        console.log(error);
    }
    return text;
}
export async function callSpringBootForAuthorities(accessToken) {
    const headers = new Headers();
    const bearer = `Bearer ${accessToken}`;
    headers.append("Authorization", bearer);

    const options = {
        method: "GET",
        headers: headers
    };
    let text = "";
    try {
        let response = await fetch(graphConfig.springBootAuthoritiesEndpoint, options);
        if (response.ok) {
            text = await response.text();
        }
    }
    catch (error) {
        console.log(error);
    }
    return text;
}
