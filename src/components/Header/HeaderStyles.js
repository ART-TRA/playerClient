import {makeStyles} from "@material-ui/core/styles";

export const headerHeight = 6;

export const useStyles = makeStyles((theme) => ({
    appBar: {
        flexGrow: 1,
        bottom: "auto",
        boxShadow: 'none',
        paddingRight: 10,
    },
    toolBar: {
        width: '100%',
        padding: 0,
        [theme.breakpoints.up('sm')]: {
            width: '80%', margin: 'auto'
        }
    },
    tabs: {
        overflow: 'auto',
        flexGrow: 1,
        display: 'flex',
        alignItems: "center",
        [theme.breakpoints.down('xs')]: {
            // justifyContent: "flex-start",
        }
    },
    tab: {
        overflow: 'unset',
        [theme.breakpoints.down('xs')]: {
            padding: 0,
        },
    },
    controls: {
        overflow: 'hidden',
        display: 'flex',
        justifyContent: "center",
        alignItems: "center",
    },
    track: {
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
    }
}));