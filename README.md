# react-native-tar-gz

A react native lib using rust for compressing and extracting tar.gz files.

## Requirements

This library uses the new architecture and as a project must have it enabled to use it.
[How to enable the new architecture](https://github.com/reactwg/react-native-new-architecture/blob/main/docs/enable-apps.md).
## Installation

As this lib uses rust, you must [install](https://www.rust-lang.org/learn/get-started) it before building.

### Android

```sh
rustup target add aarch64-linux-android armv7-linux-androideabi x86_64-linux-android i686-linux-android
npm install react-native-tar-gz
```

### Ios

```sh
rustup target add aarch64-apple-ios x86_64-apple-ios
cargo install cargo-lipo
npm install react-native-tar-gz
```

## Usage


```js
import { compress, uncompress } from 'react-native-tar-gz';

try {
    await compress(
        '<full-path>/source-folder',
        '<full-path>/archive.tar.gz'
    );
} catch(error) {
    console.error(error);
}

try {
    await uncompress(
        '<full-path>/archive.tar.gz',
        '<full-path>/destination-folder'
    );
} catch(error) {
    console.error(error);
}
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
