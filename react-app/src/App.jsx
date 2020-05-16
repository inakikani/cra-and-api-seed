import React, { useState } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory
} from "react-router-dom";
import {Box, AppBar, Toolbar, IconButton, Typography, Drawer, Divider, List, ListItem, ListItemText} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Items from './components/Items';

export default function App() {
  return (
    <Router>
      <Box>
        <AppBar position="static">
          <Toolbar component={Box}>
            <ToggleNav />
            <Typography variant="h6">
              QR Muse
            </Typography>
          </Toolbar>
        </AppBar>
        <Box>
          {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/items">
              <Items />
            </Route>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </Box>
      </Box>
    </Router>
  );
}

function ToggleNav(){
  const [isOpen, setIsOpen] = useState(false)
  const toggleDrawer = yn => (e) => {
    setIsOpen(prev => typeof yn === 'boolean' ? yn : !prev)
  }

  const history = useHistory()
  const itemSections = [['/', 'Home'], ['/about', 'About'], ['/items', 'Items']]
  const navigateTo = link => e => {
    toggleDrawer(false)()
    history.push(link[0])
  }
  return (
    <React.Fragment>
    <IconButton edge="start" 
      color="inherit" 
      aria-label="menu"
      onClick={toggleDrawer()}
    >
      <MenuIcon />
    </IconButton>
    <Drawer anchor="left" 
      open={isOpen} 
      onClose={toggleDrawer(false)}>
      <IconButton 
        onClick={toggleDrawer(false)}>
        <ChevronLeftIcon />
      </IconButton>
      <Divider />
      <List>
        {itemSections.map((link, index) => (
          <ListItem 
            button 
            onClick={navigateTo(link)}
            key={index}
          >
            <ListItemText primary={link[1]} />
          </ListItem>
        ))}
      </List>
    </Drawer>
    </React.Fragment>
  )
}

function About(){
  return (
    <main>
      <h1>ABOUT</h1>
    </main>
  )
}

function Home(){
  return (
    <main>
      <h1>Home</h1>
    </main>
  )
}