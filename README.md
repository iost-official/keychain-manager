# Keychain Manager

[![npm](https://img.shields.io/npm/l/keychain-manager.svg)](https://www.npmjs.com/package/keychain-manager)
[![npm](https://img.shields.io/npm/v/keychain-manager.svg)](https://www.npmjs.com/package/keychain-manager)
[![npm](https://img.shields.io/npm/dm/keychain-manager.svg)](https://www.npmjs.com/package/keychain-manager)

Keychain Manager JS is a key system that helps you better manager your keys. It's based around accounts with hierarchical deterministic (HD) keychains made up of ECDSA keypairs

### Getting started

```
$ npm install keychain-manager
```

```js
import {PrivateKeychain} from 'keychain-manager';
import {PublicKeychain} from 'keychain-manager';
```

### Terminology
 
Here we use the terminology that is a bit different from the terminology in other HD key systems, like in the original BIP32 proposal.

We take "keychain" to mean a hierarchical deterministic BIP32 key, where any number of keys can be derived from it.

In addition, a "private keychain" is an HD private key, a "public keychain" is an HD private key, a "child keychain" is an unhardened HD child key, an "account keychain" is a hardened HD child key, a "descendant keychain" is a keychain that has gone through a series of child derivations (because a descendant is a child of a child), and a "descendant key" is the key that corresponds to the descendant keychain.

### Private Keychain

```js
const masterPrivateKeychain = new PrivateKeychain()

const accountNumber = 0,
    accountPrivateKeychain = masterPrivateKeychain.account(accountNumber),
    accountPublicKeychain = accountPrivateKeychain.publicKeychain(),

const childNumber = 2,
    childPrivateKeychain = masterPrivateKeychain.child(childNumber)
```

A master private keychain is the highest level abstraction of keys. It represents the root or master private key for the application and/or device. Account-specific private keychains can be derived from it, which can then be used to derive account-specific public keychains.

Note that knowledge of the master private key of an account keychain derived from the master private keychain does not provide knowledge of the key of the master keychain.

```js
const childKeyName = 'child key'

const chainPathHash = accountPrivateKeychain.secretHash(childKeyName),
    privateKey = accountPrivateKeychain.descendant(chainPathHash).privateKey()
```

A private keychain is a collection of private keys with a chain-specific master key or "ancestor" key that helps derive all of the child keys.

An account private keychain is derived from a master private keychain through hardening in the key derivation process. A child private keychain, meanwhile uses hardened key derivation. It is recommended that one use at least one level of accounts derived from the master private keychain. This adds a nice capability where an entirely new keychain can be issued if the master key of a particular keychain is ever compromised.

Note that every child private key in a keychain can be traced back to the ancestor key in the chain. That said, with a chain path with enough entropy, it would be intractable to brute-force the path from the child private key to the ancestor private key.

### Public Keychain

```js
const publicKey = publicKeychain.publicKey(),
    address = publicKeychain.address(),
    chainPathHash = 'bd62885ec3f0e3838043115f4ce25eedd22cc86711803fb0c19601eeef185e39',
    descendantPublicKey = publicKeychain.decendant(chainPathHash).publicKey()
```

A public keychain is the public equivalent of a private keychain, where every public key has a corresponding private key in the corresponding keychain.

Note that every child public key in the public keychain can be traced back to the ancestor public key in the chain. But again, if the chain path is random and long enough, it would be intractable to brute-force the path from the child public key to the ancestor public key.
