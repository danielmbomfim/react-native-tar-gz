#import "TarGz.h"

@implementation TarGz
RCT_EXPORT_MODULE()

// Don't compile this code when we build for the old architecture.
#ifdef RCT_NEW_ARCH_ENABLED
- (NSString*)compress:(NSString*) source destination:(NSString*) destination {
    double *result = compress_rs(source, destination);

    if (result == 0) {
        NSString *error_message = @(nativeGetError());
        
        return error_message;
    }

    return @"Ok";
}

- (NSString*)uncompress:(NSString*) source destination:(NSString*) destination {
    double *result = uncompress_rs(source, destination);

    if (result == 0) {
        NSString *error_message = @(nativeGetError());
        
        return error_message;
    }

    return @"Ok";
}

- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params
{
    return std::make_shared<facebook::react::NativeTarGzSpecJSI>(params);
}
#endif

@end
