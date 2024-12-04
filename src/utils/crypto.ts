import CryptoJS from "crypto-js";

export const encryptLS = (data: CryptoJS.lib.WordArray | string) => {
    let encrypt = CryptoJS.AES.encrypt(data, process.env.NEXT_PUBLIC_CRYPTO_KEY as string).toString();
    return encrypt;
};

export const decryptLS = (data: CryptoJS.lib.CipherParams | string) => {
    let value = data ? data : '';
    let bytes = CryptoJS.AES.decrypt(value, process.env.NEXT_PUBLIC_CRYPTO_KEY as string);
    let decrypt;
    try {
        decrypt = bytes.toString(CryptoJS.enc.Utf8);
    } catch (error) {
        decrypt = '';
    }
    return decrypt;
};
