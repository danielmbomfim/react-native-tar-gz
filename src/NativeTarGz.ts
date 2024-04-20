import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  compress(source: string, destination: string): string;
  uncompress(source: string, destination: string): string;
}

export default TurboModuleRegistry.getEnforcing<Spec>('TarGz');
