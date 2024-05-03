#include <jni.h>
#include <string>
#include "targz-rs.h"

std::string jstring2string(JNIEnv *env, jstring jStr) {
    if (!jStr)
        return "";
    const jclass stringClass = env->GetObjectClass(jStr);
    const jmethodID getBytes = env->GetMethodID(stringClass, "getBytes", "(Ljava/lang/String;)[B");
    const jbyteArray stringJbytes = (jbyteArray) env->CallObjectMethod(jStr, getBytes, env->NewStringUTF("UTF-8"));
    size_t length = (size_t) env->GetArrayLength(stringJbytes);
    jbyte* pBytes = env->GetByteArrayElements(stringJbytes, NULL);
    std::string ret = std::string((char *)pBytes, length);
    env->ReleaseByteArrayElements(stringJbytes, pBytes, JNI_ABORT);
    env->DeleteLocalRef(stringJbytes);
    env->DeleteLocalRef(stringClass);
    return ret;
}

extern "C"
JNIEXPORT jdouble JNICALL
Java_com_reactnative_targz_TarGzModule_nativeCompress(JNIEnv *env, jclass type, jstring source, jstring destination) {
  return compress_rs(jstring2string(env, source).c_str(), jstring2string(env, destination).c_str());
}

extern "C"
JNIEXPORT jdouble JNICALL
Java_com_reactnative_targz_TarGzModule_nativeUncompress(JNIEnv *env, jclass type, jstring source, jstring destination) {
  return uncompress_rs(jstring2string(env, source).c_str(), jstring2string(env, destination).c_str());
}

extern "C"
JNIEXPORT jstring JNICALL
Java_com_reactnative_targz_TarGzModule_nativeGetError(JNIEnv *env, jclass type) {
  return env->NewStringUTF(get_error_message());
}
