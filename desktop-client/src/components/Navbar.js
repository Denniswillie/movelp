import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import InputBase from '@material-ui/core/InputBase';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: "#e6e6e6",
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: "black"
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export default function Navbar(props) {
  const classes = useStyles();

  function redirectToProfile() {
    window.open("/profile/" + props.userId, "_self");
  }

  function redirectToHome() {
    window.open("/", "_self");
  }

  // <div className={classes.search}>
  //   <div className={classes.searchIcon}>
  //     <SearchIcon />
  //   </div>
  //   <InputBase
  //     style={{color: "black"}}
  //     placeholder="Search"
  //     classes={{
  //       root: classes.inputRoot,
  //       input: classes.inputInput,
  //     }}
  //     inputProps={{ 'roboto': 'search' }}
  //   />
  // </div>

  return <div className={classes.root} style={{position: "fixed", width: "100%", zIndex: "1000000000000000000000000000000000000000000000"}}>
    <AppBar position="static" style={{backgroundColor: "white"}}>
      <Toolbar style={{width: "80%", margin: "auto"}}>
        <h1 className={classes.title} style={{color: "black", fontSize: "1.6em", margin: "0", userSelect: "none"}} nowrap="true">
          Movelp
        </h1>
        <Button onClick={redirectToHome} style={{marginLeft: "1em"}}>Home</Button>
        <Button onClick={redirectToProfile} style={{marginLeft: "1em"}}>Profile</Button>
        <Button href="/auth/logout" style={{marginLeft: "1em"}}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  </div>
}
