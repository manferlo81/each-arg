import { config } from 'bundlib'

export default config({
  esModule: true,
  interop: true,
  min: ['browser', 'module'],
  equals: true,
  project: './tsconfig.build.json',
})
