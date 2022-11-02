import { Star, Terminal } from "@mui/icons-material";
import {  
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";

const drawerWidth = 240;

const items = [
  {
    id: 1,
    label: 'Hackathons',
    icon: Terminal,
    link: '/hackathons'
  },
  {
    id: 2,
    label: 'Top Developers',
    icon: Star,
    link: '/topDevelopers'
  },
]

const SideBar = () => {
  
  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
      variant="permanent"
      anchor="left"
      open={true}
    >
      <List>
        {/* <li>
            <Link to={`hackathons/3`}>Hackathon 3</Link>
          </li> */}
        {items.map(item => {
          const { label, icon, id, link } = item;
          const IconComponent = icon;
          return (
          <ListItem key={id} disablePadding>
            <ListItemButton component={NavLink} to={link}>
              <ListItemIcon>
                <IconComponent />
              </ListItemIcon>
              <ListItemText primary={label} />
            </ListItemButton>
          </ListItem>
        )})}
      </List>
    </Drawer>
  )
};

export default SideBar;