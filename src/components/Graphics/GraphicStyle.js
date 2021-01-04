import {headerHeight} from "../Header/HeaderStyles";
import {makeStyles} from "@material-ui/core/styles";

export const graphicHeight = 100 - headerHeight;
export const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: `${headerHeight}vh`,
        boxSizing: "border-box",
        flexGrow: 1,
        height: `${graphicHeight}vh`,
        display: 'flex',
        justifyContent: 'center',
        overflowY: "auto",
    },
    img: {
        width: 400,
        height: 400,
        [theme.breakpoints.down('xs')]: {
            width: 350,
            height: 350,
            margin: "20px auto",
        },
        margin: "80px auto",
        backgroundSize: 'cover',
        border: '2px solid grey',
    },
}));