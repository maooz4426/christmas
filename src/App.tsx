import './App.css';
import {Snowfall} from "react-snowfall";

function App() {

    const snowflake1 = document.createElement('img')
    snowflake1.src = 'public/snowflake.png';

    const image = [snowflake1]

    return (
        <Snowfall
            color="#fff"
            images={image}
            style={{
                position: 'fixed',
                width: '100vw',
                height: '100vh',
            }}
            radius={[5,20]}
            snowflakeCount={200}
        />
    )
}

export default App;