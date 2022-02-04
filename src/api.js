import axios from "axios"

export const checkWord = word => {
    return axios.post(`${process.env.REACT_APP_SVC_URL}/checkWord`, { guessWord: word })
        .then(response => {
            return response.data;
        }).catch(error => console.log(error));
};