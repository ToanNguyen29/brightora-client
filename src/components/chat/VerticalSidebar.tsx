import React from 'react';
import { Box, IconButton, List, ListItem, Tooltip } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BarChartIcon from '@mui/icons-material/BarChart';
import ChatIcon from '@mui/icons-material/Chat';
import SettingsIcon from '@mui/icons-material/Settings';
import FolderIcon from '@mui/icons-material/Folder';

const VerticalSidebar: React.FC = () => {
    return (
        <Box sx={{ width: '80px', bgcolor: '#1976D2', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 2 }}>
            {/* Logo */}
            <Box sx={{ marginBottom: 2 }}>
                <img src="/path/to/logo.png" alt="Logo" style={{ width: '40px' }} />
            </Box>

            {/* Navigation Icons */}
            <List sx={{ width: '100%' }}>
                <ListItem sx={{ justifyContent: 'center' }}>
                    <Tooltip title="Dashboard" placement="right">
                        <IconButton sx={{ color: '#fff' }}>
                            <DashboardIcon />
                        </IconButton>
                    </Tooltip>
                </ListItem>
                <ListItem sx={{ justifyContent: 'center' }}>
                    <Tooltip title="Analytics" placement="right">
                        <IconButton sx={{ color: '#fff' }}>
                            <BarChartIcon />
                        </IconButton>
                    </Tooltip>
                </ListItem>
                <ListItem sx={{ justifyContent: 'center' }}>
                    <Tooltip title="Messages" placement="right">
                        <IconButton sx={{ color: '#fff' }}>
                            <ChatIcon />
                        </IconButton>
                    </Tooltip>
                </ListItem>
                <ListItem sx={{ justifyContent: 'center' }}>
                    <Tooltip title="Files" placement="right">
                        <IconButton sx={{ color: '#fff' }}>
                            <FolderIcon />
                        </IconButton>
                    </Tooltip>
                </ListItem>
                <ListItem sx={{ justifyContent: 'center' }}>
                    <Tooltip title="Settings" placement="right">
                        <IconButton sx={{ color: '#fff' }}>
                            <SettingsIcon />
                        </IconButton>
                    </Tooltip>
                </ListItem>
            </List>
        </Box>
    );
};

export default VerticalSidebar;
