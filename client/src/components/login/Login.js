import React, { useState } from 'react'
import { Box, Button, Container } from '@mui/material'
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Lock from '@mui/icons-material/Lock';


export default function Signup() {

    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')

    const [authentInfo, setAuthentInfo] = useState({ loading: false, resp: null})

    // const fetchAllProducts = () => {
    //     setAuthentInfo({ loading: true });
    //     const apiUrl = `https://inventory-management-backend.cyclic.app/api/products`;
    //     fetch(apiUrl, {
    //         mode: 'no-cors',
    //         method: "get",
    //         headers: {
    //              "Content-Type": "application/json"
    //         }
    //     })
    //       .then((res) => res.json())
    //       .then((resp) => {
    //         setAuthentInfo({ loading: false, resp });
    //       }).catch((error) => {
    //         console.log('Error ======> ',error)
    //       });
    //   }

      const signup = () => {
        setAuthentInfo({ loading: true });
        const apiUrl = `/api/login`;
        fetch(apiUrl, {
            method: "post",
            headers: {
                 "Content-Type": "application/json"
            },
            body: JSON.stringify({email: userName, password})
        })
          .then((res) => res.json())
          .then((resp) => {
            setAuthentInfo({ loading: false, resp });
          }).catch((error) => {
            console.log('Error ======> ', error)
          });
      }

  return (
    <Grid
      container
      direction='column'
      alignItems='center'
      justifyContent='center'
      xs={{ minHeight: '100vh'}}>
        <Grid item xs={3}>
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
            <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
            <TextField id="input-login" label="Email" variant="standard" 
              onChange={(e) => setUserName(e.target.value)}/>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
            <Lock sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
            <TextField id="input-pwd" type='password' 
              label="Password" onChange={(e) => setPassword(e.target.value)} variant="standard" />
          </Box>
          <Button variant="contained" onClick={signup}>Login</Button>
        </Grid>
          
        { authentInfo.resp }
    </Grid>
  )
}

