import axios from "axios"

export const checkWord = word => {
    return axios.post("http://127.0.0.1:8081/checkWord", { guessWord: word })
        .then(response => {
            return response.data;
        }).catch(error => console.log(error));
};