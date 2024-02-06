import React from 'react'

import logo from '../../assets/Logo.png'

import styles from './header.module.scss'

export default function Header() {
  return (
    <div className={styles.header}>
      <img src={logo} alt="Logo" />
    </div>
  )
}
