import {makeStyles} from "@material-ui/core/styles";
import img from "../../assets/images/021_OamZ2.png"


export const useStyles = makeStyles((theme) => ({
    root: {
        height: "100vh",
        background: `url(${img}) no-repeat`,
    },
    appBar: {
        flexGrow: 1,
        boxShadow: 'none',
        // backgroundColor: "#333333",
        backgroundColor: 'primary',
        height: 49,
        color: theme.header
    },
    toolBar: {
        width: '100%',
        margin: '0 auto',
        minHeight: '100%',
        padding: 0,
    },
    tabs: {
        flexGrow: 1,
        display: 'flex',
        justifyContent: "center",
        alignItems: "center",
        height: '100%',
        // color: '#0000008a',
    },
    logo: {
        display: 'flex',
        justifyContent: "center",
        alignItems: "center",
        height: '100%',
        width: 90,
        backgroundColor: "#e91e63",

    },
    trackDesc: {
        flexGrow: 1,
        display: 'flex',
    },
    controls: {
        display: 'flex',
        justifyContent: "center",
        alignItems: "center",
        padding: '5px 10px',
    },
    ticker: {
        minWidth: 400,
    },
    icon: {
        minWidth: 'auto',
    },
    track: {
        whiteSpace: 'nowrap',
        // minWidth: 180,
        [theme.breakpoints.down('xs')]: {
            width: 190,
        },
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        minHeight: 20
    }

}));