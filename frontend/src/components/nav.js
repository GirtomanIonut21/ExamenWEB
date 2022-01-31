import React from 'react';
import {
   Typography, Button,
  AppBar, Container, Toolbar, Box
} from '@mui/material';
import {
  Link,
} from 'react-router-dom'


const Nav = () => {
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
            MEETINGS APP
          </Typography>
       
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Link to="/meetings">
              <Button
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Meetings
              </Button>
            </Link>
            <Link to="/participants">
              <Button
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Participants
              </Button>
            </Link>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Nav;