import { BACKEND_BASE_URL, SUB_DOMAIN_URL } from "./urls";

export const checkSubDomainAvailability = async (subDomain: string) => {
    const url = BACKEND_BASE_URL + SUB_DOMAIN_URL;
    const payload = {
        "sub_domain": subDomain
    }
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });
    
        if (!response.ok) {
            throw new Error();
        };
        return response.json();
    } catch(error) {
        console.error(error);
        return null;
    }
}