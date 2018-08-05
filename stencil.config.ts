import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';

export const config: Config = {
  namespace: 'girlsinc',
  srcDir: 'src/components',
  outputTargets:[
    {
      type: 'dist',
      dir: 'st-dist'
    },
    {
      type: 'www',
      dir: 'src/assets/st-build',
      serviceWorker: null
    }
  ],
  plugins: [
    sass()
  ]
};
