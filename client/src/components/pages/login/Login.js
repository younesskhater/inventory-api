import { useContext, useEffect, useRef, useState } from 'react'
import { Box, Button } from '@mui/material'
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Lock from '@mui/icons-material/Lock';
import AuthContext from '../../../contexts/AuthProvider';
import { NavLink, useNavigate, redirect } from 'react-router-dom';

// Move login folder to pages
const LOGIN_URL = `${process.env.REACT_APP_BASE_URL || '' }/api/login`

export default function Signin() {

    const { auth, setAuth } = useContext(AuthContext)
    const navigate = useNavigate()

    const emailRef = useRef()
    const errorRef = useRef()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMsg, setErrorMsg] = useState('')

    const [loadig, setLoading] = useState(false)

    useEffect(() => {
      emailRef.current.focus();
    }, [])
    
    useEffect(() => {
      setErrorMsg('')
    }, [email, password])

      const signin = () => {
        setLoading(true);
        fetch(LOGIN_URL, {
            method: "post",
            headers: {
                 "Content-Type": "application/json"
            },
            credentials: 'include',
            body: JSON.stringify({email, password})
        })
          .then((resp) => {
            return resp.json()
          })
          .then((resp) => {
            if (resp.accessToken) {
              setAuth({user: resp.userData, accessToken: resp.accessToken })
              navigate('/', { replace: true})
            } else {
              setErrorMsg(resp.message)
              errorRef.current.focus()
            }

            setLoading(false);
          }).catch((error) => {
            if (error?.message) {
              setErrorMsg(error.message)
            } else {
              setErrorMsg('No server response, please try later')
            }
            errorRef.current.focus()
          });
      }

  return (
    // use form instead
    <Grid
      container
      direction='column'
      alignItems='center'
      justifyContent='center'
      xs={{ minHeight: '100vh'}}>
        <Grid item xs={3}>
          <p ref={errorRef} aria-live='assertive'>
            { errorMsg }
          </p>
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
            <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
            <TextField ref={emailRef} id="input-login" label="Email" variant="standard" 
              value={email} onChange={(e) => setEmail(e.target.value)} required/>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
            <Lock sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
            <TextField id="input-pwd" type='password' label="Password" 
              value={password} onChange={(e) => setPassword(e.target.value)} variant="standard" required/>
          </Box>
          <Button variant="contained" onClick={signin}>Login</Button>
          <p> Need and account ?</p>
        </Grid>
    </Grid>
  )
}

