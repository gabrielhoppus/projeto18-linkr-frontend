import swal from "sweetalert";
import axios from 'axios';


export const getData = async (URL, setState, config) => {

    try {
        if (config) {
            const response = await axios.get(URL, config);
            setState(response.data);
        } else {
            const response = await axios.get(URL);
            setState(response.data);
        }
        
        
    } catch (error) {
        console.log(error.message);
        swal({
            title: "Erro!",
            text: "An error occured while trying to fetch the posts, please refresh the page",
            icon: "error"
        });
    }
}