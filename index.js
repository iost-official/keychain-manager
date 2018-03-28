import bitcore from 'bitcore-lib';
import utils from './lib/utils';

export default {
    PrivateKeychain: require('./lib/private-keychain'),
    PublicKeychain: require('./lib/public-keychain'),
    HDPrivateKey: bitcore.HDPrivateKey,
    HDPublicKey: bitcore.HDPublicKey,
    PrivateKey: bitcore.PrivateKey,
    PublicKey: bitcore.PublicKey,
    Address: bitcore.Address,
    deriveHDKeychain: utils.deriveHDKeychain
};
