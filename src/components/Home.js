import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: 'darkgrey',
  },
  autocomplete : {
    width: '100%',
    backgroundColor: 'white',
  },
  gridList: {
    width: '100%',
    height: '100%',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  marginTop:{
    margin:'3em 0 0 0'
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
  handleItemsChange(items) {
    console.log(items)
  }

  constructor(props) {
    super(props)
    this.state = {
      filter:'all',
      repos: []
    }
  }

  componentDidMount() {
    let url = `/planets`
    fetch(url).then((response) => {
      return response.json();
    }).then((data) => {
      console.log(data.results)
      this.setState({ repos: data.results })
    }
    );
  }

  render() {
    const { classes } = this.props;
    const names = this.state.repos ? this.state.repos.map(planet=>planet.name) :['all']
    return (<div className={classes.root}>
      <div className={classes.autocomplete}>
      <Autocomplete
      id="combo-box-demo"
      options={names}
      defaultValue={['all']}
      getOptionLabel={option => option}
      style={{ width: '90%' }}
      onChange={(event, newValue) => {
        let filteredValue = this.state.repos.filter(planet=> planet.name===newValue);
        this.setState({repos:filteredValue,filter:newValue})
      }} 
      renderInput={params => (
        <TextField {...params} label="Planets" variant="outlined" fullWidth />
      )}
    />
    </div>
      <GridList cellHeight={200} spacing={1} className={classes.gridList}>
        {this.state.repos ? this.state.repos.map((planet, i) =>

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

        ) :
          'hello'
        }
      </GridList>
    </div>


    )
  }
}
export default withStyles(styles)(Home);