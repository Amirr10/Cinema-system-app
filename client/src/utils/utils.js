import axios from 'axios'

export const getSubscriptions = () => {
    return axios.get(' http://localhost:5000/cinema/allSubs')
}

