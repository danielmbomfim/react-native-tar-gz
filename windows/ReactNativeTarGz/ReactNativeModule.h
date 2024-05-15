#pragma once

#include "JSValue.h"
#include "NativeModules.h"
#include "targz-rs.h"

using namespace winrt::Microsoft::ReactNative;

namespace winrt::ReactNativeTarGz
{

    REACT_MODULE(ReactNativeModule, L"TarGz")
    struct ReactNativeModule
    {
        // See https://microsoft.github.io/react-native-windows/docs/native-modules for details on writing native modules

        REACT_INIT(Initialize)
        void Initialize(ReactContext const &reactContext) noexcept
        {
            m_reactContext = reactContext;
        }

        REACT_METHOD(compress)
        void compress(std::string source, std::string destination, winrt::Microsoft::ReactNative::ReactPromise<void> promise) noexcept
        {
            auto capturedPromise = promise;
            int8_t result = compress_rs(source.c_str(), destination.c_str());

            if (result == 0)
            {
                const char *error_message = get_error_message();
                capturedPromise.Reject(error_message);
                return;
            }

            capturedPromise.Resolve();
        }

        REACT_METHOD(uncompress)
        void uncompress(std::string source, std::string destination, winrt::Microsoft::ReactNative::ReactPromise<void> promise) noexcept
        {
            auto capturedPromise = promise;
            int8_t result = uncompress_rs(source.c_str(), destination.c_str());

            if (result == 0)
            {
                const char *error_message = get_error_message();
                capturedPromise.Reject(error_message);
                return;
            }

            capturedPromise.Resolve();
        }

    private:
        ReactContext m_reactContext{nullptr};
    };

} // namespace winrt::ReactNativeTarGz
