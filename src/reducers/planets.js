import { PLANET_SUCCESS, RECEIVE_FILTERED_PLANETS } from '../actions';
const initialData = {
    filteredPlanets: [],
    planets: []
}

export default function (state = initialData, action) {
    const newState = Object.assign({}, state);
    switch (action.type) {
        case PLANET_SUCCESS:
        newState.planets = action.planets;
        break;

        case RECEIVE_FILTERED_PLANETS:
        newState.filteredPlanets = action.filteredPlanets;
        break;

        default:
        return state;
    }
    return newState;
}