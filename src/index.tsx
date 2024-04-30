const TarGz = require('./NativeTarGz').default;

export function compress(source: string, destination: string): Promise<void> {
  return TarGz.compress(source, destination);
}

export function uncompress(source: string, destination: string): Promise<void> {
  return TarGz.uncompress(source, destination);
}
