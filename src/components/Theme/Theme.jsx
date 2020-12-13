import React, {useState} from "react";
import {createMuiTheme, makeStyles, responsiveFontSizes, ThemeProvider} from '@material-ui/core/styles';
import Player from "../../App";
import img from "../../assets/images/021_OamZ2.png";
import Paper from "@material-ui/core/Paper";


export const Theme = (props) => {
    const [themeMode, setThemeMode] = useState('dark')
    let theme = createMuiTheme({
        palette: {
            type: themeMode,
            primary: {
                main: themeMode === 'light' ? '#121212' : '#ffffff',
            },
            secondary: {
                main: '#333333',
            }
        },
        typography: {

        }
    })
    theme = responsiveFontSizes(theme)
    const useStyles = makeStyles(theme => ({
        root: {
            height: "100vh",
            // background: themeMode === 'light' ? `url(${img}) no-repeat` : `url(${img2}) no-repeat`,
            background: themeMode === 'light' && `url(${img}) no-repeat`,
            backgroundColor: themeMode === 'light' ? '#ffffff' : '#121212',
        }
    }))
    const classes = useStyles()
    const darkMode = () => {
        setThemeMode('dark')
    }
    const lightMode = () => {
        setThemeMode('light')
    }

    return (
        <ThemeProvider theme={theme}>
            <Paper className={classes.root}>
                <Player themeMode={themeMode} darkMode={darkMode} lightMode={lightMode}/>
            </Paper>
        </ThemeProvider>
    )
}

//просто справка
// export const useStyles = makeStyles((theme) => ({
//     someTitle: {
//         "&:hover": {
//             backgroundColor: ...,
//             color: ...,
//             ...
//         }
//     },
// }));