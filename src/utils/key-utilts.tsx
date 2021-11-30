/* eslint-disable @typescript-eslint/no-unused-vars */
// https://github.com/diafygi/webcrypto-examples/blob/master/README.md#rsa-oaep---exportkey
// https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/decrypt
// https://github.com/rzcoder/node-rsa


import NodeRSA from 'node-rsa';

import AES from 'crypto-js/aes';
import CryptoJS from 'crypto-js';

function ab2str(buf) {
    return String.fromCharCode.apply(null, new Uint8Array(buf));
}
function getMessageEncoding(t) {
    let enc = new TextEncoder();
    return enc.encode(t);
}

function getMessageDecoding(t) {
    let enc = new TextDecoder();
    return enc.decode(t);
}

async function exportPrivateCryptoKey(key) {
    const exported = await window.crypto.subtle.exportKey(
        "pkcs8",
        key
    );
    const exportedAsString = ab2str(exported);
    const exportedAsBase64 = window.btoa(exportedAsString);
    return `-----BEGIN PRIVATE KEY-----\n${exportedAsBase64}\n-----END PRIVATE KEY-----`;    
}

async function exportPublicCryptoKey(key) {
    const exported = await window.crypto.subtle.exportKey(
        "spki",
        key
    );
    const exportedAsString = ab2str(exported);
    const exportedAsBase64 = window.btoa(exportedAsString);
    return `-----BEGIN PUBLIC KEY-----\n${exportedAsBase64}\n-----END PUBLIC KEY-----`;
}

async function importPrivateCryptoKey(key, type) {
    const _key = await window.crypto.subtle.importKey(
        type,
        key,
        {   //these are the algorithm options
            name: "RSA-OAEP",
            hash: {name: "SHA-256"}, //can be "SHA-1", "SHA-256", "SHA-384", or "SHA-512"
        },
        false,
        ["encrypt"]
    );
    return _key;   
}
  
function encryptMessage(publicKey) {
    let encoded = getMessageEncoding('aababsdfFfdSDf dFD S R3sF3$SdfSF#f');
    return window.crypto.subtle.encrypt(
      {
        name: "RSA-OAEP",
      },
      publicKey,
      encoded
    );
}

function decryptMessage(privateKey, data) {
    data = Buffer.from(data, 'base64');
    return window.crypto.subtle.decrypt(
        {
            name: "RSA-OAEP"
        },
        privateKey,
        data
    );
}

export const generateRsaKey = async () => {   
     
    const keypair = new NodeRSA({b: 2048});

    const _public = keypair.exportKey('pkcs1-public-pem');
    const _private = keypair.exportKey('pkcs8-private-pem');

    // const keypair1 = new NodeRSA();
    // const keypair2 = new NodeRSA();

    // keypair1.importKey(_public);
    // keypair2.importKey(_private);

  
    return {
        private: _private,
        public: _public,
    } 
}

export const generateRandomDeviceId = (keyLenth = 214) => {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < keyLenth; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * 
        charactersLength));
    }
    return result;
}

export const generateRandomAesKey = (keyLenth = 214) => {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*-_=+|:<>?/,.';
    var charactersLength = characters.length;
    for ( var i = 0; i < keyLenth; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * 
        charactersLength));
    }
    return result;
}

export const aesEncrypt0 = async (_data) => {
    let _key = generateRandomAesKey();
    let res = await AES.encrypt(_data, _key).toString();
    return {
        key: _key,
        data: res,
    };
}

export const aesDecrypt0 = async (_data, _key) => {
    let bytes  = await AES.decrypt(_data, _key);
    let res = bytes.toString(CryptoJS.enc.Utf8);
    return res;
}

export const encrypt = (_data, publicKey) => {
    const key = new NodeRSA(publicKey, 'pkcs1-public-pem', {
        environment: 'browser',
        encryptionScheme : 'pkcs1',
        signingScheme : 'pkcs1',
    });    
    return key.encrypt(_data, 'base64');
}

export const decrypt = (_data, privateKey) => {
    const key = new NodeRSA(privateKey, 'pkcs8-private-pem', {
        environment: 'browser',
        encryptionScheme : 'pkcs1',
    });    
    return key.decrypt(_data, 'utf8');
}

export const aesRsaEncrypt = async (_values, serverKey) => {
    var values = await aesEncrypt0(JSON.stringify(_values));
    const _key = encrypt(values.key, serverKey);
    values.key = _key;
    return values;
}