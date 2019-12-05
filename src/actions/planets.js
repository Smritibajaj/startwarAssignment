export const getPlanet = () => {
    return dispatch => {
      axios.get(`/planets`)
      .then((response) => {
        return response.json();
      }).then((data) => {
        dispatch(receiveFilteredMarkers(data.results));
      }
      )
      .catch(err => console.error('loading places unsuccessful', err));
    };
};