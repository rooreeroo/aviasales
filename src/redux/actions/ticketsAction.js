import { LOAD_TICKETS, GET_SEARCH_ID, LOADER_DISPLAY_OFF, LOADER_DISPLAY_ON, ERROR_ON, SHOW_MORE } from '../types'
import AviasalesService from '../../services/aviasalesService/aviasalesService'

const aviasalesService = new AviasalesService()

function loaderOn() {
  return {
    type: LOADER_DISPLAY_ON,
  }
}

function loaderOff() {
  return {
    type: LOADER_DISPLAY_OFF,
  }
}

export function showMore() {
  return {
    type: SHOW_MORE,
  }
}

function onError(err) {
  return {
    type: ERROR_ON,
    err,
  }
}

export function getSearchId() {
  return async (dispatch) => {
    try {
      const searchId = await aviasalesService.getSearchId().then(async (id) => id)
      if (searchId) {
        dispatch({
          type: GET_SEARCH_ID,
          searchId,
        })
      }
    } catch (err) {
      dispatch(onError(err))
    }
  }
}

export function loadTickets(searchId) {
  return async (dispatch) => {
    try {
      let ticketsArr = []
      dispatch(loaderOn())
      let stop = false
      do {
        // eslint-disable-next-line
        ticketsArr = await aviasalesService
          .getTickets(searchId)
          .then((res) => res)
          .catch()
        if (ticketsArr) {
          stop = ticketsArr.stop
          dispatch({
            type: LOAD_TICKETS,
            data: ticketsArr,
          })
        }
      } while (!stop)
      dispatch(loaderOff())
    } catch (err) {
      dispatch(onError(err))
      dispatch(loaderOff())
    }
  }
}
