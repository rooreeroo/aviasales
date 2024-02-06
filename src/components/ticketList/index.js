import React from 'react'
import { useSelector } from 'react-redux'
import { sortBy } from 'lodash'

import TicketCard from '../ticketCard'
import ShowMore from '../showMore'

import styles from './ticketList.module.scss'

export default function TicketList() {
  const { tickets, viewCount } = useSelector((state) => state.TicketsReducer)
  const { selectedKey } = useSelector((state) => state.TabsReducer)
  const filters = useSelector((state) =>
    Object.values(state.FilterReducer).reduce((newArr, item) => {
      if (item.stopsCount !== undefined && item.checked) {
        newArr.push(item.stopsCount)
      }
      return newArr
    }, [])
  )

  const filterArr = tickets.filter(
    (el) => el.segments[0].stops.length === el.segments[1].stops.length && filters.includes(el.segments[0].stops.length)
  )

  const sortArr = sortBy(filterArr, [
    (o) => (selectedKey === 'fast' ? o.segments[0].duration + o.segments[1].duration : o.price),
  ])

  const viewArr = sortArr.slice(0, viewCount)
  return (
    <>
      <ul className={styles.ticketList}>
        {viewArr.map((ticket, index) => (
          // eslint-disable-next-line
          <TicketCard key={index} ticket={ticket} />
        ))}
      </ul>
      {viewArr.length ? <ShowMore /> : <span>Рейсов, удовлетворяющих условиям поиска, не найдено</span>}
    </>
  )
}
