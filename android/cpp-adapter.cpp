#include <jni.h>
#include "react-native-tar-gz.h"

extern "C"
JNIEXPORT jdouble JNICALL
Java_com_reactnative_targz_TarGzModule_nativeMultiply(JNIEnv *env, jclass type, jdouble a, jdouble b) {
    return reactnative_targz::multiply(a, b);
}
