import {Provider} from "react-redux";
import {store} from "./store";
import Main from "./components/Main"
import './App.css';
import React from "react";

function App() {
    let baseStyle = {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    }

    return (
        <div className="App">
            <Provider store={store}>
                <Main />
            </Provider>
        </div>
    );
}

export default App;
