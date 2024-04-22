#ifdef __cplusplus
#import "targz-rs.h"
#endif

#ifdef RCT_NEW_ARCH_ENABLED
#import "RNTarGzSpec.h"

@interface TarGz : NSObject <NativeTarGzSpec>
#else
#import <React/RCTBridgeModule.h>

@interface TarGz : NSObject <RCTBridgeModule>
#endif

@end
