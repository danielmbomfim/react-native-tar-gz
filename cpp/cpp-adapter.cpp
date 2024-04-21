#include <jni.h>
#include <string>
#include "targz.h"

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

std::string get_last_error_message() {
  int error_length = last_error_length();

  if (error_length == 0) {
    return std::string();
  }

  std::string msg(error_length, '\0');
  int ret = last_error_message(&msg[0], msg.length());

  if (ret <= 0) {
    return std::string();
  }

  return msg;
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
  return env->NewStringUTF(get_last_error_message().c_str());
}
