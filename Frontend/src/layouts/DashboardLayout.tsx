import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Avatar,
  Menu,
  MenuItem,
  IconButton,
  InputBase,
  Container,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AddIcon from '@mui/icons-material/Add';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const SearchWrapper = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
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

interface NavBarProps {
  onSearch?: (query: string) => void;
}

export const NavBar: React.FC<NavBarProps> = ({ onSearch }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [searchValue, setSearchValue] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleMenuClose();
    navigate('/login');
  };

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchValue.trim()) {
      onSearch?.(searchValue);
      navigate(`/search?q=${searchValue}`);
    }
  };

  const drawerContent = (
    <Box sx={{ width: 250 }}>
      <Box sx={{ padding: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          PostSpace
        </Typography>
      </Box>
      <Divider />
      <List>
        <ListItem button onClick={() => { navigate('/dashboard'); setDrawerOpen(false); }}>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button onClick={() => { navigate('/create'); setDrawerOpen(false); }}>
          <ListItemIcon>
            <AddIcon />
          </ListItemIcon>
          <ListItemText primary="Create Post" />
        </ListItem>
        {user?.role === 'admin' && (
          <ListItem button onClick={() => { navigate('/admin'); setDrawerOpen(false); }}>
            <ListItemIcon>
              <AdminPanelSettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Admin Panel" />
          </ListItem>
        )}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="sticky" sx={{ background: '#ffffff', color: '#1a1a1a', borderBottom: '1px solid #e0e0e0' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton
              color="inherit"
              onClick={() => setDrawerOpen(true)}
              sx={{ display: { xs: 'flex', sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                cursor: 'pointer',
                fontSize: { xs: '1.2rem', sm: '1.5rem' },
              }}
              onClick={() => navigate('/dashboard')}
            >
              PostSpace
            </Typography>
          </Box>

          <SearchWrapper>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search posts..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyPress={handleSearch}
              inputProps={{ 'aria-label': 'search' }}
            />
          </SearchWrapper>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Avatar
              sx={{
                width: 40,
                height: 40,
                cursor: 'pointer',
                background: '#1565c0',
                color: '#fff',
              }}
              onClick={handleMenuOpen}
            >
              {user?.name.charAt(0).toUpperCase()}
            </Avatar>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
              <MenuItem disabled>
                <Typography variant="body2">{user?.name}</Typography>
              </MenuItem>
              <MenuItem disabled>
                <Typography variant="caption" color="text.secondary">
                  {user?.email}
                </Typography>
              </MenuItem>
              <Divider />
              {user?.role === 'admin' && (
                <MenuItem onClick={() => { navigate('/admin'); handleMenuClose(); }}>
                  <AdminPanelSettingsIcon fontSize="small" sx={{ marginRight: 1 }} />
                  Admin Panel
                </MenuItem>
              )}
              {user?.role === 'admin' && <Divider />}
              <MenuItem onClick={handleLogout}>
                <LogoutIcon fontSize="small" sx={{ marginRight: 1 }} />
                Logout
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        {drawerContent}
      </Drawer>
    </>
  );
};

interface DashboardLayoutProps {
  children: React.ReactNode;
  onSearch?: (query: string) => void;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, onSearch }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <NavBar onSearch={onSearch} />
      <Container maxWidth="lg" sx={{ paddingY: 3, flex: 1 }}>
        {children}
      </Container>
    </Box>
  );
};
