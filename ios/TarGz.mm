using namespace std;
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
        // int error_length = last_error_length();
        // NSString *error_message = @"";

        // if (error_length != 0) {
        //     std::string msg(error_length, '\0');
        //     int ret = last_error_message(&msg[0], msg.length());

        //     if (ret > 0) {
        //         error_message = [NSString stringWithUTF8String:ret];
        //     }
        // }

        NSError *error = [NSError errorWithDomain:@"error" code:200 userInfo:@{@"Error reason": @"Invalid Input"}];
        
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
        // int error_length = last_error_length();
        // NSString *error_message = @"";

        // if (error_length != 0) {
        //     std::string msg(error_length, '\0');
        //     int ret = last_error_message(&msg[0], msg.length());

        //     if (ret > 0) {
        //         error_message = [NSString stringWithUTF8String:ret];
        //     }
        // }

        NSError *error = [NSError errorWithDomain:@"error" code:200 userInfo:@{@"Error reason": @"Invalid Input"}];
        
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
