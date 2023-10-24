import { graphConfig } from "./authConfig";

/**
 * Attaches a given access token to a MS Graph API call. Returns information about the user
 * @param accessToken 
 */
export async function callSpringBoot(accessToken) {
    const headers = new Headers();
    const bearer = `Bearer ${accessToken}`;
    headers.append("Authorization", bearer);

    const options = {
        method: "GET",
        headers: headers
    };
    let text = "";
    try {
        let response = await fetch(graphConfig.springBootEndpoint, options);
        text = await response.text();
    }
    catch (error) {
        console.log(error);
    }
    return text;
}
