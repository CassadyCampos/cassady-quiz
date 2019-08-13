import React from 'react';
import { Component } from 'react';
import Game from './Components/Game';


class App extends Component {
    render() {
        return (
            <div>
                {/* singleton DOMParser? IDK */}
                <Game domParserHtmlEntities={new DOMParser()} />
            </div>
        )
    }
}

export default App;
