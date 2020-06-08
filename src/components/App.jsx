import React, { useEffect, useReducer } from 'react';
// eslint-disable-next-line
import RenderMap from './map';
import SearchBar from './searchBar';


function reducer(state, [wsMessageType, wsMessagePayload]) {
  switch (wsMessageType) {
    case 'vehiclesData':
      return { vehiclesData: wsMessagePayload };
    case 'infoData':
      return { vehiclesData: wsMessagePayload };
    default:
      return state;
  }
}
const initialState = {};
function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const ws = new WebSocket('ws://192.168.1.2:8000');

    ws.onopen = () => {
      ws.send(JSON.stringify({ hi: 'hi message to server' }));
    };

    ws.onmessage = ({ data }) => {
      const msg = JSON.parse(data);
      dispatch([msg.type, msg.text]);
    };
    return () => {
      ws.close();
    };
  }, []);

  // To exclude a component that needs layout effects from the server-rendered
  // HTML, render it conditionally with showChild && <Child />
  // and defer showing it with useEffect(() => { setShowChild(true); }, []).
  // This way, the UI doesn’t appear broken before hydration.
  return (
    <>
      <SearchBar vehiclesData={state.vehiclesData} />
      <RenderMap vehiclesData={state.vehiclesData} />
    </>
  );
}

export default App;
