import moment from 'moment';
import CryptoJS from 'crypto-js';
import { LoginPayload } from '@/services/integrations/idm/type';

export const urlValidateToken = process.env.NEXT_PUBLIC_IDM_BASE_URL_STAGING + '/idm/token/authorize';

interface RequestPayload {
    username: string;
    user_type: number; // 2
    ip: string;
    device: string;
    os: string;
    browser: string;
    device_id: string; // 0000000001
}

interface GeneratedRequest {
    headers: Record<string, string>;
    body: LoginPayload;
}

export function generateRequestHeadersAndPayload(
    payload: RequestPayload,
    password: string,
    passwordKey: string,
    publicKeySignature: string,
    apiKey: string,
    source: string
): GeneratedRequest {
    const datetime = moment().format("YYYY-MM-DD HH:mm:ss");
    const passwordRaw = password + 2;

    const hashPassword = CryptoJS.HmacSHA256(passwordRaw, passwordKey).toString();

    const message = Buffer.from(
        [apiKey, source, payload.device_id, datetime].join(":")
    ).toString("base64");

    const signatureRaw = [
        message,
        payload.username,
        hashPassword,
        payload.user_type,
        payload.ip,
        payload.device,
        payload.os,
        payload.browser,
        payload.device_id,
        datetime,
    ].join("");

    const signature = CryptoJS.HmacSHA256(signatureRaw, publicKeySignature).toString();
    const updatedPayload = {
        ...payload,
        datetime,
        password: hashPassword,
        signature,
    };

    return {
        headers: {
            "Content-Type": "application/json",
            "Authorization": "token = Zk1CWG5oSE51b3hZQ2VpQTpEVC1JbnRvb2xzOjAwMDAwMDAwMDE=",
            "DT-SMSF-API-Key": "fMBXnhHNuoxYCeiA",
            "DT-SMSF-Source": "DT-Intools",
            "DT-SMSF-DeviceID": "0000000001",
            "DT-SMSF-DateTime": datetime,
        },
        body: updatedPayload,
    };
}

export const generateRequestBodyAuthorize = (token: string, username: string, user_type: number, datetime: string, privateKey: string) => {
    let signature = CryptoJS.HmacSHA256(
        token + // LS_TOKEN
        username +
        user_type +
        datetime,
        privateKey).toString();

    const ValidateTokenRequestBody = {
        username: username,
        user_type: user_type,
        datetime: datetime,
        signature: signature
    };
    return JSON.stringify(ValidateTokenRequestBody);
};