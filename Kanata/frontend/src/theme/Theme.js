import * as React from 'react';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        mode: 'dark',
        cyan: '#82feea',
        green: '#8efa81',
        orange: '#ffca80',
        pink: '#fe80bf',
        purple: '#9580ff',
        red: '#ff9580',
        yellow: '#fffa80',
        background: {
            default: 'black',
        },
        text: {
            //primary: 'white',
        },
    },
    typography: {
        h1: {
            color: 'white',
            fontSize: '2em',
        },
        body1: {
            // color: 'white'
        } 

    }
});

export default theme;