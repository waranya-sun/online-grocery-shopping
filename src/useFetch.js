import {useState} from "react";

export default function useFetch(baseURL){
    const [loading, setLoading] = useState(true);

    function get(endpoint){
        return new Promise( (resolve, reject) => {
            fetch(baseURL+endpoint)
            .then( response => response.json())
            .then( data => {
                if(!data){
                    setLoading(false);
                    return reject(data);
                }
                setLoading(false);
                resolve(data);
            })
            .catch( error => {
                console.error(error);
                setLoading(false);
                reject(error);
            });
        })
    }

    return {get, loading};
}
