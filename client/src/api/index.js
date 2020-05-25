import Axios from 'axios'

const server = Axios.create({
    baseURL: "https://mighty-garden-53836.herokuapp.com"
    // baseURL: "http://localhost:3000"
})

export default server