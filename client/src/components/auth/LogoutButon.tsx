import { useContext } from "react";
import { useAuth } from "../../context/AuthContext";
import { DrawerContext } from "../../context/drawerContext";
import { IconButton } from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';

const LogoutButton: React.FC = () => {
    const drawerContext = useContext(DrawerContext);
    const { setUsername } = useAuth();

    const handleLogout = async () => {
        drawerContext.toggleDrawer(false);
        try {
            await fetch('https://devproj3ct.pl:9000/auth/logout', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then(response => response.json())
                .then(data => {

                    console.log(data)
                    if (data.isLoggedIn === false) {
                        localStorage.removeItem('username');
                        setUsername(null);
                    }
                });
        } catch (err) {
            console.log("error with checking session", err);
        }
    }
    return (
        <>
            <IconButton onClick={handleLogout}><LogoutIcon sx={{ color: "#FFF" }} fontSize='medium' /></IconButton>
        </>
    )
}

export { LogoutButton };