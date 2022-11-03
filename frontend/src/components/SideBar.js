import { Login, Logout, Star, Terminal } from "@mui/icons-material";
import {  
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import { logout } from "../store/actions";

const useStyles = makeStyles({
  active: {
    '& .Mui-selected': {
      backgroundColor: "#42A9DF",
    },
  },
  list: {
    paddingTop: 0
  },
  divider: {
    marginTop: '80vh'
  }
});

const drawerWidth = 240;

const items = [
  {
    id: 'hackathons',
    label: 'Hackathons',
    icon: Terminal,
    link: '/hackathons'
  },
  {
    id: 'topDevelopers',
    label: 'Top Developers',
    icon: Star,
    link: '/topDevelopers'
  },
]

const SideBar = () => {
  const location = useLocation();
  const classes = useStyles();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  let authItem = 
    isLoggedIn
     ? {
        AuthIcon: Logout,
        AuthLabel: 'Logout',
        actionProperty: {onClick: () => dispatch(logout())}
      } : {
        AuthIcon: Login,
        AuthLabel: 'Login',
        actionProperty: {to: '/login', component: NavLink}
      };

  const { AuthIcon, AuthLabel, actionProperty } = authItem;

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          height: 'auto'
        }
      }}
      variant="permanent"
      anchor="left"
      open={true}
    >
      <List disablePadding classes={{root: classes.list}}>
        {items.map(item => {
          const { label, icon, id, link } = item;
          const IconComponent = icon;
          let isSelected = location.pathname === link;
          return (
          <ListItem
            key={id}
            disablePadding
          >
            <ListItemButton 
              disabled={!isLoggedIn}
              component={NavLink}
              to={link}
              selected={isSelected}
              classes={{ selected: classes.active }}
              /* Wasn't able to override mui selected class background color
               * but I prefer using time in readying other logic 
               * over trying to figure out why it's not working... sorry. */
              style={{ backgroundColor: `${(isSelected && isLoggedIn) ? '#ABD9F1' : ''}` }}
            >
              <ListItemIcon >
                <IconComponent />
              </ListItemIcon>
              <ListItemText primary={label} />
            </ListItemButton>
          </ListItem>
        )})}
        {/* In current implementation, without a header, for time's sake,
          * I would visually prefer to have login redirection button at the end of the list, in the lower-left corner
          * of the screen. This margin being used isn't a good practice, specially because it doesn't 
          * adapt to varying screens, but I preferred to move on to logic instead
          * of keeping to deal with aesthetics rather to find an more orthodox way 
          * of setting, the component in the bottomprobably using refs*/}
        <Divider style={{ marginTop: '80vh' }}/>
        <ListItem disablePadding >
          <ListItemButton {...actionProperty}>
            <ListItemIcon >
              <AuthIcon />
            </ListItemIcon>
            <ListItemText primary={AuthLabel} />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  )
};

export default SideBar;