import React, { useState } from 'react';
import { IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NavigationModal from './NavigationModal';
import '../styles/navigationButtonStyles.css';

const NavigationButton = () => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div className="navigation-button">
            <IconButton color="inherit" onClick={handleOpen}>
                <MenuIcon style={{ fontSize: 32 }} /> {/* Увеличиваем размер иконки */}
            </IconButton>
            <NavigationModal open={open} onClose={handleClose} />
        </div>
    );
};

export default NavigationButton;
