import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  compress(source: string, destination: string): Promise<void>;
  uncompress(source: string, destination: string): Promise<void>;
}

export default TurboModuleRegistry.getEnforcing<Spec>('TarGz');
