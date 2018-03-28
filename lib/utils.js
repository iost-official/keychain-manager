import {HDPrivateKey} from 'bitcore-lib';
import {HDPublicKey} from 'bitcore-lib';

function zeroPad(s, numCharacters) {
    return (Array(numCharacters).join('0') + s).slice(-numCharacters)
}

function deriveHDKeychain(parentKeychain, chainPathHash) {
    let currentKeychain = parentKeychain;
    const chainPathParts = chainPathHash.match(/.{1,8}/g);
    const chainSteps = [];

    chainPathParts.forEach(part => {
        const chainStep = parseInt(part, 16) % (2 ** 31);
        chainSteps.push(chainStep)
    })

    chainSteps.forEach(chainStep => {
        currentKeychain = currentKeychain.derive(chainStep, false)
    })

    return currentKeychain
}

export default {
    deriveHDKeychain,
    zeroPad
};