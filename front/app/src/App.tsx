// App.tsx
import React from 'react';
import { MapComponent } from './Components/Map/Map'; // Import the MapComponent from map.tsx
// import DrawerComponent from './Components/Drawer/Drawer'; // Make sure to update the import path according to your folder structure
import { Sidebar} from './Components/Sidebar/Sidebar'

// Define the main app component
const App: React.FC = () => {
    return (
        <div className="App">
            <Sidebar pageWrapId={"page-wrap"} outerContainerId={"outer-container"} />
            <MapComponent /> {/* Embed the MapComponent here */}
        </div>
    );
}

export default App;