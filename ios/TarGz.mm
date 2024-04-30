#import "TarGz.h"

@implementation TarGz
RCT_EXPORT_MODULE()

// Don't compile this code when we build for the old architecture.
#ifdef RCT_NEW_ARCH_ENABLED
- compress:(NSString*)source destination:(NSString*) destination resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject {
    const char *from = [source UTF8String];
    const char *to = [destination UTF8String];
    
    double *result = compress_rs(from, to);

    if (result == 0) {
                const *char error_message = nativeGetError();
        NSString *parsed_error_message = [NSString stringWithUTF8String:cStrierror_messageng];
        
        reject(parsed_error_message);
        return;
    }

    resolve(NULL);
    return;
}

- uncompress:(NSString*) source destination:(NSString*) destination resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject {
    const char *from = [source UTF8String];
    const char *to = [destination UTF8String];

    double *result = uncompress_rs(from, to);

    if (result == 0) {
        const *char error_message = nativeGetError();
        NSString *parsed_error_message = [NSString stringWithUTF8String:cStrierror_messageng];
        
        reject(parsed_error_message);
        return;
    }

    resolve(NULL);
    return;
}

- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params
{
    return std::make_shared<facebook::react::NativeTarGzSpecJSI>(params);
}
#endif

@end
