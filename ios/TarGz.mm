#import "TarGz.h"

@implementation TarGz
RCT_EXPORT_MODULE()

// Don't compile this code when we build for the old architecture.
#ifdef RCT_NEW_ARCH_ENABLED
- (void)compress:(NSString*)source destination:(NSString*) destination resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject {
    const char *from = [source UTF8String];
    const char *to = [destination UTF8String];
    
    int8_t result = compress_rs(from, to);

    if (result == 0) {
        const char *c_string = get_error_message();
        NSString *error_message = [NSString stringWithUTF8String:c_string];
        NSError *error = [NSError errorWithDomain:@"react-native-tar-gz-error" code:200 userInfo:@{@"Error reason": error_message}];
        
        reject(@"tarball_error", @"Failed to compress", error);
        return;
    }

    resolve(NULL);
    return;
}

- (void)uncompress:(NSString*) source destination:(NSString*) destination resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject {
    const char *from = [source UTF8String];
    const char *to = [destination UTF8String];

    int8_t result = uncompress_rs(from, to);

    if (result == 0) {
        const char *c_string = get_error_message();
        NSString *error_message = [NSString stringWithUTF8String:c_string];
        NSError *error = [NSError errorWithDomain:@"react-native-tar-gz-error" code:200 userInfo:@{@"Error reason": error_message}];
        
        reject(@"tarball_error", @"Failed to uncompress", error);
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
