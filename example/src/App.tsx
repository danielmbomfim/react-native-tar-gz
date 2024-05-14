import * as React from 'react';
import {
  Alert,
  PermissionsAndroid,
  Platform,
  TouchableOpacity,
  type Permission,
} from 'react-native';
import * as RNFS from '@dr.pogodin/react-native-fs';

import { StyleSheet, View, Text } from 'react-native';
import { compress, uncompress } from 'react-native-tar-gz';

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

    if (await RNFS.exists(RNFS.CachesDirectoryPath + '/archive.tar.gz')) {
      await RNFS.unlink(RNFS.CachesDirectoryPath + '/archive.tar.gz');
      console.log(
        await RNFS.exists(RNFS.CachesDirectoryPath + '/archive.tar.gz')
      );
    }

    try {
      await compress(
        RNFS.CachesDirectoryPath + '/test',
        RNFS.CachesDirectoryPath + '/archive.tar.gz'
      );

      console.log(
        (await RNFS.readDir(RNFS.CachesDirectoryPath)).map((i) => i.path)
      );
      Alert.alert('Success');
    } catch (error) {
      console.warn(error);
    }
  }

  async function uncompressFolder() {
    if (!(await RNFS.exists(RNFS.CachesDirectoryPath + '/results'))) {
      await RNFS.mkdir(RNFS.CachesDirectoryPath + '/results');
    } else {
      await RNFS.unlink(RNFS.CachesDirectoryPath + '/results');
      await RNFS.mkdir(RNFS.CachesDirectoryPath + '/results');
    }

    try {
      await uncompress(
        RNFS.CachesDirectoryPath + '/archive.tar.gz',
        RNFS.CachesDirectoryPath + '/results'
      );

      console.log(
        (await RNFS.readDir(RNFS.CachesDirectoryPath + '/results')).map(
          (i) => i.path
        )
      );
      Alert.alert('Success');
    } catch (error) {
      console.warn(error);
    }
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
