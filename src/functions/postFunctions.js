import swal from "sweetalert";
import axios from 'axios';


export const getPosts = (URLposts, config) => {

    try {
        const response = axios.get(URLposts, config);
        return response;
    } catch (error) {
        console.log(error.message);
        swal({
            title: "Erro!",
            text: "An error occured while trying to fetch the posts, please refresh the page",
            icon: "error"
        });
    }
}