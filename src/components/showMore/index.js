import React from 'react'
import { useDispatch } from 'react-redux'

import { showMore } from '../../redux/actions/ticketsAction'

import styles from './showMore.module.scss'

export default function ShowMore() {
  const dispatch = useDispatch()
  const clickHandler = () => {
    dispatch(showMore())
  }

  return (
    <button className={styles.showMore} onClick={clickHandler} type="button">
      Показать ещё 5 билетов
    </button>
  )
}
