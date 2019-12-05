import React from 'react';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import Typography from '@material-ui/core/Typography';


export default function GridContainer(props) {
    const { planet, classes, cols, rows } = props;
    return (
        <>
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
        </>
    )
}