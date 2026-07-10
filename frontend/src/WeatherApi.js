import { useEffect } from "react";
import API from "./api/weatherApi";

function App() {

    useEffect(() => {

        API.get("/weather")
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
            });

    }, []);

    return <h1>Weather AI</h1>;
}

export default App;