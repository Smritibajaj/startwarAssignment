import axios from 'axios';
export const PLANET_SUCCESS = "PLANET_SUCCESS";
export const RECEIVE_FILTERED_PLANETS = 'RECEIVE_FILTERED_PLANETS';


export const receivePlanets = planets => ({ type: PLANET_SUCCESS, planets });
export const receiveFilteredPlanets = filteredPlanets => ({ type:RECEIVE_FILTERED_PLANETS , filteredPlanets });

export const getPlanet = () => {
    return dispatch => {
      axios.get(`/planets`)
      .then((response) => {
        console.log(response)
        return response.data;
      }).then((data) => {
        dispatch(receivePlanets(data.results));
      }
      )
      .catch(err => console.error('loading places unsuccessful', err)
      );
    };
};