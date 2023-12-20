import React from 'react'
import { Grid } from '@mui/material'
import { Outlet } from 'react-router-dom'
import Header from './header/Header'

export default function Layout() {
  return <>
    <Header />
    <Grid>
      <Outlet />
    </Grid>
  </>
}
