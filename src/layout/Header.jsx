import { useEffect, useState } from 'react';
import { useMovieStore } from '../store/useMovieStore';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Collapse from '@mui/material/Collapse';
import Container from '@mui/material/Container';
import Drawer from '@mui/material/Drawer';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Icon from '@mdi/react';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import { mdiNetflix } from '@mdi/js';
import Tooltip from '@mui/material/Tooltip';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
export const Header = () => {
  const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
  const pages = [
    { id: 1, name: 'Home', path: '/' },
    { id: 2, name: 'Genres', path: '/' },
    { id: 3, name: 'Top Movies', path: '/' },
    { id: 4, name: 'Top Rated', path: '/' },
    { id: 5, name: 'Popular', path: '/' },
    { id: 6, name: 'About', path: '/' },
  ];
  const movieGenres = useMovieStore((state) => state.movieGenres);
  const getGenres = useMovieStore((state) => state.getGenres);
  const getByGenre = useMovieStore((state) => state.getByGenre);
  useEffect(() => {
    const getMovieGenres = async () => {
      await getGenres();
    };
    getMovieGenres();
  }, []);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [openGenres, setOpenGenres] = useState(false);

  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);

  const handleCloseUserMenu = () => setAnchorElUser(null);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <AppBar position="static" color="error">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <MenuIcon onClick={handleOpen} className="card" />
            <Icon
              onClick={handleOpen}
              path={mdiNetflix}
              size={1}
              className="card"
            />
            <div className="netLogo">
              <span className="spanLogo"></span>
            </div>

            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              Netflux
            </Typography>

            <Box
              sx={{
                flexGrow: 1,
                display: { xs: 'flex', md: 'none' },
              }}
            ></Box>

            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              Netflux
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages ? (
                pages.map((page) => (
                  <Button
                    key={page.id}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    <a
                      className="menuNavItems"
                      href={page.path}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {page.name}
                    </a>
                  </Button>
                ))
              ) : (
                <div>Error...</div>
              )}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <Avatar
                  onClick={handleOpenUserMenu}
                  alt="Remy Sharp"
                  src="/static/images/avatar/2.jpg"
                />
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      {/* Drawer */}
      <Drawer anchor="left" open={open} onClose={handleClose}>
        {/* Botón para cerrar el Drawer */}
        <IconButton onClick={handleClose}>
          <ChevronLeftIcon />
        </IconButton>

        {/* Lista de enlaces */}
        <List sx={{ width: 200, p: 0 }}>
          {pages.map((page) => {
            if (page.name === 'Genres') {
              return (
                <div key={page.id}>
                  <ListItem
                    component="a"
                    sx={{ cursor: 'pointer' }}
                    onClick={() => setOpenGenres(!openGenres)}
                  >
                    <ListItemText primary={page.name} />
                    {openGenres ? <ExpandLess /> : <ExpandMore />}
                  </ListItem>
                  <Collapse in={openGenres} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {movieGenres.map((genre) => (
                        <ListItem
                          key={genre.id}
                          component="a"
                          href={genre.path}
                          sx={{ pl: 4, cursor: 'pointer' }}
                        >
                          <Button
                            onClick={() => getByGenre(genre.name, genre.id, 1)}
                            variant="text"
                            sx={{ pt: 0, pb: 0 }}
                          >
                            {genre.name}
                          </Button>
                        </ListItem>
                      ))}
                    </List>
                  </Collapse>
                </div>
              );
            } else {
              return (
                <ListItem
                  key={page.id}
                  component="a"
                  href={page.path}
                  onClick={handleClose}
                >
                  <ListItemText primary={page.name} />
                </ListItem>
              );
            }
          })}
        </List>
      </Drawer>
    </>
  );
};
