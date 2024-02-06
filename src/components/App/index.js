import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getSearchId, loadTickets } from '../../redux/actions/ticketsAction'
import Header from '../header'
import TabsList from '../tabsList'
import Filters from '../filters'
import Spinner from '../spinner'
import TicketList from '../ticketList'

import styles from './app.module.scss'
import '../../global.scss'

export default function App() {
  const dispatch = useDispatch()
  const { searchId, isLoading, isError } = useSelector((state) => state.TicketsReducer)
  useEffect(() => {
    dispatch(getSearchId())
  }, [])

  useEffect(() => {
    if (typeof searchId === 'string') {
      dispatch(loadTickets(searchId))
    }
  }, [searchId])

  return (
    <div className={styles.app}>
      <div className={styles.app__wrapper}>
        <Header />
      </div>
      <div className={styles.app__wrapper}>
        <aside className={styles.app__aside}>
          <Filters />
        </aside>
        <main className={styles.app__main}>
          {isError ? <span>Что-то пошло не так. {isError}</span> : null}
          <TabsList />
          <Spinner isLoading={isLoading} />
          <TicketList />
        </main>
      </div>
    </div>
  )
}
