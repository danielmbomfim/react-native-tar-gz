package com.reactnative.targz;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.Promise;
import com.facebook.react.module.annotations.ReactModule;

@ReactModule(name = TarGzModule.NAME)
public class TarGzModule extends NativeTarGzSpec {
  public static final String NAME = "TarGz";

  public TarGzModule(ReactApplicationContext reactContext) {
    super(reactContext);
  }

  @Override
  @NonNull
  public String getName() {
    return NAME;
  }

  static {
    System.loadLibrary("react-native-tar-gz");
  }

  private static native double nativeCompress(String source, String destination);
  private static native double nativeUncompress(String source, String destination);
  private static native String nativeGetError();

  @Override
  public void compress(String source, String destination, Promise promise) {
    double result = nativeCompress(source, destination);

    if (result == 0) {
      promise.reject(nativeGetError());
      return;
    }

    promise.resolve(null);
  }

  @Override
  public void uncompress(String source, String destination, Promise promise) {
    double result = nativeUncompress(source, destination);

    if (result == 0) {
      promise.reject(nativeGetError());
      return;
    }

    promise.resolve(null);
  }
}
