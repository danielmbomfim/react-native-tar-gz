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
    if (
      !(await RNFS.exists(RNFS.ExternalStorageDirectoryPath + '/Download/test'))
    ) {
      await RNFS.mkdir(RNFS.ExternalStorageDirectoryPath + '/Download/test');
      await RNFS.writeFile(
        RNFS.ExternalStorageDirectoryPath + '/Download/test/t.txt',
        'test'
      );
    }

    const result = compress(
      RNFS.ExternalStorageDirectoryPath + '/Download/test',
      RNFS.ExternalStorageDirectoryPath + '/Download/archive.tar.gz'
    );

    console.log(result);

    Alert.alert('Success');
  }

  async function uncompressFolder() {
    if (
      !(await RNFS.exists(
        RNFS.ExternalStorageDirectoryPath + '/Download/archive.tar.gz'
      ))
    ) {
      console.warn(
        `${RNFS.ExternalStorageDirectoryPath + '/Download/archive.tar.gz'} not found`
      );
      return;
    }

    if (
      !(await RNFS.exists(
        RNFS.ExternalStorageDirectoryPath + '/Download/results'
      ))
    ) {
      await RNFS.mkdir(RNFS.ExternalStorageDirectoryPath + '/Download/results');
    }

    const result = uncompress(
      RNFS.ExternalStorageDirectoryPath + '/Download/archive.tar.gz',
      RNFS.ExternalStorageDirectoryPath + '/Download/results'
    );

    console.log(result);

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
