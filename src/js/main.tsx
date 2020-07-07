import * as React from "react";
import * as ReactDOM from "react-dom";
import {Provider} from "react-redux";
import { configStore } from "./redux/store/store";

import Base from "./components/Base";
import "../styles/style.scss";

const store = configStore();
ReactDOM.render(
    <Provider store={store}>
        <Base />
    </Provider>,
    document.getElementById("root")
);