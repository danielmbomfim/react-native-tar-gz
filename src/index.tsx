const TarGz = require('./NativeTarGz').default;

export function compress(source: string, destination: string): string {
  return TarGz.compress(source, destination);
}

export function uncompress(source: string, destination: string): string {
  return TarGz.uncompress(source, destination);
}
