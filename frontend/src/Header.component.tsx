import React from "react";
import { AppBar, Toolbar, Typography, createStyles, WithStyles, withStyles } from "@material-ui/core";

const styles = () =>
    createStyles({
        title: {
            flexGrow: 1
        },
    });

const HeaderComponent: React.FC<WithStyles<typeof styles>> = ({ classes }) => (
    <AppBar position="absolute">
        <Toolbar>
            <Typography component="h1" variant="h6" color="inherit" className={classes.title}>
                Slack status updater
            </Typography>
        </Toolbar>
    </AppBar>
);

export default withStyles(styles)(HeaderComponent);
