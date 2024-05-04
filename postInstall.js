const fs = require('node:fs');

const filePath = './targz/.cargo/config.toml';
const ndkHome = process.env.NDK_HOME;

function expandEnvVars() {
  if (process.env.SKIP_POST_INSTALL_SCRIPT === '1') {
    return;
  }

  if (!ndkHome) {
    throw Error('NDK_HOME environment variable is not defined correctly.');
  }

  let path = '';

  if (ndkHome.endsWith('/') || ndkHome.endsWith('\\')) {
    path = ndkHome.substring(0, ndkHome.length - 1).replaceAll('\\', '/');
  } else {
    path = ndkHome.replaceAll('\\', '/');
  }

  const content = fs.readFileSync(filePath, 'utf-8');

  fs.writeFileSync(filePath, content.replaceAll('${NDK_HOME}', path));
}

expandEnvVars();
