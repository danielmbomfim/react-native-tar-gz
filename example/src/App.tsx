import * as React from 'react';
import {
  Alert,
  PermissionsAndroid,
  Platform,
  TouchableOpacity,
  type Permission,
} from 'react-native';
import RNFS from 'react-native-fs';

import { StyleSheet, View, Text } from 'react-native';
import { compress, uncompress } from '@react-native/tar-gz';

export default function App() {
  React.useEffect(() => {
    if (Platform.OS === 'android') {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE as Permission
      );
    }
  }, []);

  async function compressFolder() {
    if (!(await RNFS.exists(RNFS.CachesDirectoryPath + '/test'))) {
      await RNFS.mkdir(RNFS.CachesDirectoryPath + '/test');
      await RNFS.writeFile(RNFS.CachesDirectoryPath + '/test/t.txt', 'test');
    }

    const result = compress(
      RNFS.CachesDirectoryPath + '/test',
      RNFS.CachesDirectoryPath + '/archive.tar.gz'
    );

    if (result !== 'Ok') {
      console.warn(result);
      return;
    }

    Alert.alert('Success');
  }

  async function uncompressFolder() {
    if (!(await RNFS.exists(RNFS.CachesDirectoryPath + '/results'))) {
      await RNFS.mkdir(RNFS.CachesDirectoryPath + '/results');
    }

    const result = uncompress(
      RNFS.CachesDirectoryPath + '/archive.tar.gz',
      RNFS.CachesDirectoryPath + '/results'
    );

    if (result !== 'Ok') {
      console.warn(result);
      return;
    }

    Alert.alert('Success');
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={compressFolder}>
        <Text>Compress</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={uncompressFolder}>
        <Text>Uncompress</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
