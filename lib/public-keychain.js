import {HDPublicKey} from 'bitcore-lib';
import BigNumber from 'bn.js';
import {deriveHDKeychain} from './utils';

class PublicKeychain {
    constructor(publicKeychainString) {
        if (publicKeychainString) {
            this.hdKeychain = HDPublicKey(publicKeychainString)
        } else {
            throw Error('a public key string is required')
        }
    }

    toString() {
        return this.hdKeychain.toString()
    }

    child(childIndex) {
        const childKeychain = this.hdKeychain.derive(childIndex);
        return new PublicKeychain(childKeychain.toString())
    }

    descendant(chainPath) {
        const descendantKeychain = deriveHDKeychain(this.hdKeychain, chainPath);
        return new PublicKeychain(descendantKeychain.toString())
    }

    publicKey() {
        return this.hdKeychain.publicKey
    }

    address() {
        return this.hdKeychain.publicKey.toAddress()
    }
}

export default PublicKeychain;
