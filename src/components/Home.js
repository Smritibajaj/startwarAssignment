import React, { Component } from "react";
import { connect } from 'react-redux'
import { getPlanet, receiveFilteredPlanets } from '../actions';
import { withStyles } from "@material-ui/core/styles";
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: 'darkgrey',
  },
  autocomplete: {
    width: '100%',
    backgroundColor: 'white',
  },
  gridList: {
    width: '100%',
    height: '100%',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
    listStyleType: 'none',
  },
  marginTop: {
    margin: '3em 0 0 0'
  },
  tile: {
    border: 'solid 1px'
  },
  titleBar: {
    background:
      'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
      'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
  icon: {

    color: 'white',
  },
});

class Home extends Component {
  componentDidMount() {
    this.props.getPlanet();
  }

  getfilteredValue(value){
    console.log(value);
    this.props.getFilterList(value);
  }
  render() {
    const { classes, planets, filteredPlanets } = this.props;
    console.log(this.props.filteredPlanets)
    return (<div className={classes.root}>
      <div className={classes.autocomplete}>
        <Autocomplete
          id="combo-box-demo"
          options={planets}
          getOptionLabel={option => option.name}
          onChange={(event, newValue) => {
            this.getfilteredValue(newValue);
          }}
          style={{ width: '100%' }}
          renderInput={params => (
            <TextField {...params} label="Planets" variant="outlined" fullWidth />
          )}
        />
      </div>
      
        {(planets && filteredPlanets.length === 0) ? planets.map((planet, i) =>
        <GridList cellHeight={200} spacing={1} className={classes.gridList}>
          <GridListTile key={i} cols={planet.population !== "unknown" ? 2 : 1} rows={planet.population !== "unknown" ? 2 : 1} className={classes.tile}>
            <GridListTileBar
              title={planet.name}
              titlePosition="top"
              actionIcon={
                <IconButton aria-label={`star ${planet.name}`} className={classes.icon}>
                  <StarBorderIcon />
                </IconButton>
              }
              actionPosition="left"
              className={classes.titleBar}
            />
            <div className={classes.marginTop}>
              <Typography variant="h6" gutterBottom>
                Population : {planet.population}
              </Typography>
              <Typography variant="h6" gutterBottom>
                Rotation Period : {planet.rotation_period}
              </Typography>
              <Typography variant="h6" gutterBottom>
                Orbital Period : {planet.orbital_period}
              </Typography>
              <Typography variant="h6" gutterBottom>
                Grounds : {planet.terrain}
              </Typography>
              {planet.population !== 'unknown' ? <Typography variant="h6" gutterBottom>
                Surfacewater : {planet.surface_water}
              </Typography> : <></>}
            </div>
          </GridListTile>
          </GridList>
        ) :
          <div className={classes.gridList}>
            { filteredPlanets.map((planet, i) => 
            <Grid item xs={12}>
            <GridListTile key={i} className={classes.tile}> 
            <GridListTileBar
              title={planet.name}
              titlePosition="top"
              actionIcon={
                <IconButton aria-label={`star ${planet.name}`} className={classes.icon}>
                  <StarBorderIcon />
                </IconButton>
              }
              actionPosition="left"
              className={classes.titleBar}
            />
            <div className={classes.marginTop}>
              <Typography variant="h6" gutterBottom>
                Population : {planet.population}
              </Typography>
              <Typography variant="h6" gutterBottom>
                Rotation Period : {planet.rotation_period}
              </Typography>
              <Typography variant="h6" gutterBottom>
                Orbital Period : {planet.orbital_period}
              </Typography>
              <Typography variant="h6" gutterBottom>
                Grounds : {planet.terrain}
              </Typography>
              {planet.population !== 'unknown' ? <Typography variant="h6" gutterBottom>
                Surfacewater : {planet.surface_water}
              </Typography> : <></>}
            </div>
          </GridListTile>
          </Grid>)
            }
          </div>
        }      
    </div>
    )
  }
}

const mapStateToProps = state => ({
  planets: state.planets.planets,
  filteredPlanets: state.planets.filteredPlanets
});
const mapDispatchToProps = (dispatch) => {
  return {
    getPlanet() {
      dispatch(getPlanet());
    },
    getFilterList(value){
      dispatch(receiveFilteredPlanets([value]));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Home));