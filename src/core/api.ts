import { 
    BACKEND_BASE_URL, 
    SUB_DOMAIN_URL,
    SIGN_UP_URL,
    VERIFY_OTP_URL
} from "@/core/urls";
import { SignUpType } from "@/schemas/SignUpSchema";
import { api } from "./apiClient";

export const checkSubDomainAvailability = async (subDomain: string) => {
    const url = BACKEND_BASE_URL + SUB_DOMAIN_URL;
    const payload = {
        "sub_domain": subDomain
    }
    return api.post(url, payload);
}

export const registerUser = async(data: SignUpType) => {
    const url = BACKEND_BASE_URL+SIGN_UP_URL;
    const payload = {
        "first_name": data.firstName,
        "last_name": data.lastName,
        "password": data.password,
        "subdomain": data.subDomain,
        "email": data.email,
        "country": data.country
    }
    return api.post(url, payload);
}

export const verifyOtp = async(userId:string, otp: string) => {
    const url = BACKEND_BASE_URL+VERIFY_OTP_URL;
    const payload = {
        "temp_user_id": userId,
        "code": otp
    }
    return api.post(url, payload);

}