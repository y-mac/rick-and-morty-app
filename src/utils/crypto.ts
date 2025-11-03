// src/utils/crypto.ts
import CryptoJS from 'crypto-js';


const SECRET_KEY = process.env.REACT_APP_STORAGE_SECRET || 'mi-clave-super-secreta-2025';

/**
 * Cifra un objeto JavaScript usando AES.
 * @param data El objeto a cifrar.
 * @returns Una cadena cifrada.
 */
export const encryptData = (data: string): string => {
    try {
        return CryptoJS.AES.encrypt(data, SECRET_KEY).toString();
    } catch (error) {
        console.error('Error al cifrar datos:', error);
        return ''; 
    }
};

/**
 * Descifra una cadena cifrada y la convierte de nuevo a un objeto JavaScript.
 * @param ciphertext La cadena cifrada.
 * @returns La cadena descifrada (tipo string) o undefined si falla.
 */
export const decryptData = (ciphertext: string): string | undefined => {
    if (!ciphertext) return undefined;
    try {
        const bytes  = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY);
        const dataString = bytes.toString(CryptoJS.enc.Utf8);

        if (!dataString) return undefined; 

        return dataString;
    } catch (error) {
        console.error('Error al descifrar datos:', error);
        return undefined;
    }
};