// map.tsx
import React, { useEffect } from "react";
import maplibre from "maplibre-gl"; // Import the maplibre library
import "maplibre-gl/dist/maplibre-gl.css"; // Import the CSS for MapLibre to style the map appropriately
import "./Map.css"; // Custom CSS for additional styling

export const MapComponent: React.FC = () => {
    useEffect(() => {
        console.log("Initializing map...");

        // Initialize the map when the component mounts
        const map = new maplibre.Map({
            container: "map", // ID of the div where the map will render
            center: [-157.7694392095103, 21.44933977381804], // Center coordinates
            zoom: 6, // Zoom level
            style: "https://tile.openstreetmap.jp/styles/osm-bright-ja/style.json" // URL to the map style
        });

        map.on('load', () => {
            console.log("Map loaded.");
            // Load GeoJSON from a URL or local file
            map.addSource('points', { // 'points' is a unique ID for this source
                type: 'geojson',
                data: './data/sample.geojson' // URL or path to your GeoJSON file
            });

            // Add a layer to display the loaded GeoJSON data
            map.addLayer({
                id: 'points-layer', // Unique ID for this layer
                type: 'circle', // Type of layer as circle for points
                source: 'points', // Reference to the source ID added above
                paint: {
                    'circle-radius': 10, // Circle size
                    'circle-color': '#007cbf' // Circle color
                }
            });
        });

        // Create a popup but don't add it to the map yet
        const popup = new maplibre.Popup({
            closeButton: false,
            closeOnClick: false
        });

        map.on('mouseenter', 'points-layer', (e) => {
            // Change the cursor style as a UI indicator.
            map.getCanvas().style.cursor = 'pointer';
        
            if (e.features && e.features.length > 0) {
                const feature = e.features[0];
        
                // Type guard to check if it's a Point geometry; adjust accordingly if your data could have other types
                if (feature.geometry.type === 'Point') {
                    const coordinates = feature.geometry.coordinates as maplibre.LngLatLike;
                    const description = feature.properties && feature.properties.name ? feature.properties.name : "No name";
        
                    // Set the contents and location of the popup.
                    popup.setLngLat(coordinates)
                         .setHTML(description)
                         .addTo(map);
                }
            }
        });
        
        map.on('mouseleave', 'points-layer', () => {
            map.getCanvas().style.cursor = '';
            popup.remove();
        });

        // Return a cleanup function to remove the map when the component unmounts
        return () => {
            console.log("Cleaning up map...");
            map.remove();
        };
    }, []); // Empty dependency array ensures this runs only onces

    // Return a div that will serve as the container for the map
    return (
        <div id="map-container" style={{ position: 'relative', width: '100%', height: '100vh' }}> {/* Ensure container has dimensions */}
        {/* </div><div id="map-container" style={{ width: '100%', height: '100vh' }}> Ensure container has dimensions */}
            <div id="map" style={{ width: '100%', height: '100%' }}></div> {/* Ensure the map div has dimensions too */}
        </div>
    );
};