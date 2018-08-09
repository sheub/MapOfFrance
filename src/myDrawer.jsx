import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import classNames from "classnames";

import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";

import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { fromJS } from 'immutable';
import MAP_STYLE from './mbstyle/style.json';

import ListSubheader from '@material-ui/core/ListSubheader';

import VillagesIcon from './mbstyle/icons/village-11.svg';
import MuseumIcon from './mbstyle/icons/museum-11.svg';
import UnescoIcon from './mbstyle/icons/World_Heritage_Logo_global_small.svg';
import JardinsIcon from './mbstyle/icons/Jardins_Remarquables_15.svg';
import GSFIcon from './mbstyle/icons/GSF.svg';
import AOPIcon from './mbstyle/icons/AOP.svg';


import "./App.css";

const defaultMapStyle = fromJS(MAP_STYLE);

const categories = ['Unesco', 'Villages', 'Museum', 'AOP', 'Jardins', 'GSF'];

// Layer id patterns by category
const layerSelector = {
    Museum: /listeetlocalisationdesmuseesdefrance/,
    Villages: /villages-frenchcorrected-3gqhy6/,
    Unesco: /whs-frenchcorrected-dq63pv/,
    AOP: /n-inao-aop-fr-16md1w/,
    Jardins: /jardinfr-8nabpa/,
    GSF: /gsf-frenchcorrected/
};


const drawerWidth = 240;

const styles = theme => ({

    root: {
        display: "flex"
    },
    toolbar: {
        //paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        padding: "0 8px",
        ...theme.mixins.toolbar
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        })
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
        })
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 36
    },
    menuButtonHidden: {
        display: "none"
    },
    title: {
        flexGrow: 0
    },
    drawerPaper: {
        position: "relative",
        whiteSpace: "nowrap",
        width: drawerWidth,
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
        })
    },
    drawerPaperClose: {
        overflowX: "hidden",
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
        width: theme.spacing.unit * 7,
        [theme.breakpoints.up("sm")]: {
            width: theme.spacing.unit * 9
        }
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 0,
        padding: theme.spacing.unit * 0
    }
});

class MyDrawer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visibility: { Museum: false, Villages: true, Unesco: true, AOP: false, Jardins: true, GSF: true },
            open:true
        };
        this._defaultLayers = defaultMapStyle.get("layers");
    }

    _onVisibilityChange(name, event) {
        const visibility = { ...this.state.visibility, [name]: event.target.checked };
        this.setState({ visibility });
        this._updateMapStyle({
            ...this.state,
            visibility
        });
    }

    _updateMapStyle({ visibility }) {
        const layers = this._defaultLayers.filter(
            layer => {
                const id = layer.get("id");
                return categories.every(
                    name =>
                        visibility[name] ||
                        !layerSelector[name].test(id)
                );
            }
        );
        defaultMapStyle.set("layers", layers);
        this.props.onChange(defaultMapStyle.set("layers", layers));
    }

    componentDidMount() {
        this._updateMapStyle(this.state);
    }

    state = {
        open: true
    };

    handleDrawerOpen = () => {
        this.setState({ open: true });
    };

    handleDrawerClose = () => {
        this.setState({ open: false });
    };

    handleChange = name => event => {
        this.setState({ [name]: event.target.checked });
    };

    render() {
        const { classes } = this.props;

        return <React.Fragment>
            <div className={classes.root}>
              <CssBaseline />
              <AppBar ref={elem => (this.AppBar = elem)} position="absolute" className={classNames(classes.appBar, this.state.open && classes.appBarShift)}>
                <Toolbar disableGutters={!this.state.open} className={classes.toolbar}>
                  <IconButton color="inherit" aria-label="Open drawer" onClick={this.handleDrawerOpen} className={classNames(classes.menuButton, this.state.open && classes.menuButtonHidden)}>
                    <MenuIcon />
                  </IconButton>
                  <Typography variant="title" color="inherit" noWrap className={classes.title}>
                    Travel in France
                  </Typography>
                </Toolbar>
              </AppBar>
              <Drawer ref={elem => (this.Drawer = elem)} variant="permanent" classes={{ paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose) }} open={this.state.open}>
                <div className={classes.toolbarIcon}>
                  <IconButton onClick={this.handleDrawerClose}>
                    <ChevronLeftIcon />
                  </IconButton>
                </div>
                <Divider />
                <ListSubheader>Culture et Patrimoine</ListSubheader>
                <div>
                  <img src={VillagesIcon} className="controlPanelIcon" alt="Plus beaux Villages de France" title="Plus beaux Villages de France" />
                  <FormControlLabel style={{ marginLeft: 0 }} control={<Checkbox checked={this.state.visibility["Villages"]} onChange={this._onVisibilityChange.bind(this, "Villages")} value="true" color="default" />} label="Villages de France" />
                </div>
                <div>
                  <img src={UnescoIcon} className="controlPanelIcon" alt="Unesco World Heritage" title="Unesco World Heritage" />
                  <FormControlLabel style={{ marginLeft: 0 }} control={<Checkbox checked={this.state.visibility["Unesco"]} onChange={this._onVisibilityChange.bind(this, "Unesco")} value="true" color="default" />} label="Unesco World Heritage" />
                </div>
                <div>
                  <img src={JardinsIcon} className="controlPanelIcon" alt="Jardins remarquables" title="Jardins remarquables" />
                  <FormControlLabel style={{ marginLeft: 0 }} control={<Checkbox checked={this.state.visibility["Jardins"]} onChange={this._onVisibilityChange.bind(this, "Jardins")} value="true" color="default" />} label="Jardins Remarquables" />
                </div>

                <div>
                  <img src={GSFIcon} className="controlPanelIcon" alt="Grand Site de France" title="Grand Site de France" />
                  <FormControlLabel style={{ marginLeft: 0 }} control={<Checkbox checked={this.state.visibility["GSF"]} onChange={this._onVisibilityChange.bind(this, "GSF")} value="true" color="default" />} label="Grands Sites" />
                </div>

                <div>
                  <img src={MuseumIcon} className="controlPanelIcon" alt="Museum" title="Museum" />
                  <FormControlLabel style={{ marginLeft: 0 }} control={<Checkbox checked={this.state.visibility["Museum"]} onChange={this._onVisibilityChange.bind(this, "Museum")} value="true" color="default" />} label="Museum" />
                </div>

                <div>
                  <img src={AOPIcon} className="controlPanelIcon" alt="Apellations d'origine controllée" title="Apellations d'origine controllée" />
                  <FormControlLabel style={{ marginLeft: 0 }} control={<Checkbox checked={this.state.visibility["AOP"]} onChange={this._onVisibilityChange.bind(this, "AOP")} value="true" color="default" />} label="AOP" />
                </div>

              </Drawer>
            </div>
          </React.Fragment>;
    }
}
MyDrawer.propTypes = {
    classes: PropTypes.object.isRequired
};
export default withStyles(styles)(MyDrawer);


