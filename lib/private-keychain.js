import {HDPrivateKey} from 'bitcore-lib';
const sha256 = require('bitcore-lib').crypto.Hash.sha256;
import BigNumber from 'bn.js';
import PublicKeychain from './public-keychain';
import {deriveHDKeychain} from './utils';

class PrivateKeychain {
    constructor(privateKeychainString) {
        if (privateKeychainString) {
            this.hdKeychain = new HDPrivateKey(privateKeychainString)
        } else {
            this.hdKeychain = new HDPrivateKey()
        }
    }

    toString() {
        return this.hdKeychain.toString()
    }

    account(childIndex) {
        /* An account is a hardened keychain child */
        const childKeychain = this.hdKeychain.derive(childIndex, true);
        return new PrivateKeychain(childKeychain.toString())
    }

    child(childIndex) {
        /* Every child is unhardened. For a hardened child, create an account. */
        const hdKeychain = this.hdKeychain.derive(childIndex, false);
        return new PrivateKeychain(hdKeychain.toString())
    }

    publicKeychain() {
        const chainMasterPublicKey = this.hdKeychain.hdPublicKey;
        return new PublicKeychain(chainMasterPublicKey.toString())
    }

    privateKey() {
        return this.hdKeychain.privateKey
    }

    descendant(chainPath) {
        /* A descendant is a child of a child of a child of a... */
        const descendantKeychain = deriveHDKeychain(this.hdKeychain, chainPath);
        return new PrivateKeychain(descendantKeychain.toString())
    }

    secretHash(name) {
        const chainPathBuffer = sha256(new Buffer(this.hdKeychain.toString() + name));
        return chainPathBuffer.toString('hex')
    }
}

export default PrivateKeychain;
