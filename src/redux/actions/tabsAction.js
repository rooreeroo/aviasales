import { CHANGE_TAB } from '../types'

// eslint-disable-next-line
export const changeTab = (key) => {
  return {
    type: CHANGE_TAB,
    key,
  }
}
