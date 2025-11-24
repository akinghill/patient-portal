import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import DashboardIcon from '@mui/icons-material/Dashboard';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import ScienceIcon from '@mui/icons-material/Science';
import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
  Tooltip,
} from '@mui/material';

const DRAWER_WIDTH_EXPANDED = 240;
const DRAWER_WIDTH_COLLAPSED = 72;

const Root = styled(Box)(({ theme }) => ({
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  borderRight: `1px solid ${theme.palette.divider}`,
  background: theme.palette.background.paper,
}));

interface SidebarProps {
  collapsed: boolean;
  onToggleCollapsed: () => void;
  selected: any;
  onSelect: (id: any) => void;
}

const navItems: any[] = [
  { id: 'dashboard', href: '/', label: 'Dashboard', icon: <DashboardIcon /> },
  { id: 'appointments', href: '/appointments', label: 'Appointments', icon: <EventAvailableIcon /> },
  { id: 'labResults', href: '/lab-results', label: 'Lab Results', icon: <ScienceIcon /> },
  { id: 'messages', href: '/messages', label: 'Messages', icon: <MailIcon /> },
];

export default function Sidebar({ collapsed, onToggleCollapsed, selected, onSelect }: SidebarProps) {
  const width = collapsed ? DRAWER_WIDTH_COLLAPSED : DRAWER_WIDTH_EXPANDED;

  return (
    <Drawer
      variant="permanent"
      sx={{
        width,
        flexShrink: 0,
        '& .MuiDrawer-paper': { width },
      }}
    >
      <Root>
        <Box sx={{ display: 'flex', alignItems: 'center', px: 2, py: 1 }}>
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
            {/* Add logo */}
            {!collapsed && (
              <Box component="span" sx={{ fontWeight: 700 }}>
                App
              </Box>
            )}
          </Box>

          <IconButton
            onClick={onToggleCollapsed}
            size="small"
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? <MenuIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </Box>

        <Box sx={{ flexGrow: 1 }}>
          <List>
            {navItems.map((item) => {
              const selectedItem = selected === item.href;
              return (
                <Tooltip key={item.id} title={collapsed ? item.label : ''} placement="right">
                  <ListItemButton
                    selected={selectedItem}
                    onClick={() => onSelect(item.href)}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: collapsed ? 'center' : 'flex-start',
                      px: collapsed ? 0 : 2,
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: 0, mr: collapsed ? 0 : 2, justifyContent: 'center' }}>
                      {item.icon}
                    </ListItemIcon>
                    {!collapsed && <ListItemText primary={item.label} />}
                  </ListItemButton>
                </Tooltip>
              );
            })}
          </List>
        </Box>

        <Box sx={{ p: 2 }}>
          <ListItemButton
            onClick={() => onSelect('profile')}
            selected={selected === 'profile'}
            sx={{ borderRadius: 1, justifyContent: collapsed ? 'center' : 'flex-start' }}
          >
            <ListItemIcon sx={{ minWidth: 0, mr: collapsed ? 0 : 2, justifyContent: 'center' }}>
              <AccountCircleIcon />
            </ListItemIcon>
            {!collapsed && <ListItemText primary="Profile" />}
          </ListItemButton>
        </Box>
      </Root>
    </Drawer>
  );
}
