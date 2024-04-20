package com.reactnative.targz;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ReactApplicationContext;
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
  public String compress(String source, String destination) {
    double result = nativeCompress(source, destination);

    if (result == 0) {
      return nativeGetError();
    }

    return "Ok";
  }

  @Override
  public String uncompress(String source, String destination) {
    double result = nativeUncompress(source, destination);

    if (result == 0) {
      return nativeGetError();
    }

    return "Ok";
  }
}
