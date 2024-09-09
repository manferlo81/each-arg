import { config } from 'bundlib';

export default config({
  min: ['browser', 'module'],
  equals: true,
  project: 'tsconfig-build.json',
});
