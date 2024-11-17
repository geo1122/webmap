
    // Initialize the map centered at a known location (latitude, longitude)
    const map = L.map('map').setView([27.7172, 85.3240], 13); // Example coordinates

    // Add OpenStreetMap base layer
    const osmLayer = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
        maxZoom: 20,
        subdomains:['mt0','mt1','mt2','mt3']
});

    osmLayer.addTo(map);

    // Custom red circle marker for a known location
    const redCircleIcon = L.divIcon({
        className: 'custom-red-circle',
        html: '<div style="width: 20px; height: 20px; background-color: red; border-radius: 50%; border: 3px solid white;"></div>',
        iconSize: [20, 20],
        iconAnchor: [10, 10]
    });

    // Marker that follows the map center (Red Circle)
    const centerMarker = L.marker(map.getCenter(), {
        icon: redCircleIcon,
        draggable: true
    }).addTo(map);

    // Function to update the center marker position when the map is panned
    function updateCenterMarkerPosition() {
        const center = map.getCenter();
        centerMarker.setLatLng(center);
    }

    // Listen for the map's "move" event to update the center marker position
    map.on('move', updateCenterMarkerPosition);

    // Function to locate the user's position
    function locateUser() {
        map.locate({ setView: true, maxZoom: 16 });
    }

    // Set up geolocation to locate user's current position
    map.on('locationfound', function (e) {
        // Show the user's location with the blue marker icon
        L.marker(e.latlng).addTo(map);
    });

    // Handle location errors
    map.on('locationerror', function () {
        alert("Location access denied or unavailable.");
    });

    // Add event listener to the "Locate Me" button
    document.getElementById('locate-btn').addEventListener('click', locateUser);

    // Open Kobo Toolbox questionnaire on center marker click
    centerMarker.on('click', function () {
        const lat = centerMarker.getLatLng().lat.toFixed(6); // Get the latitude of the red circle
        const lng = centerMarker.getLatLng().lng.toFixed(6); // Get the longitude of the red circle

        // Construct the URL with geo_location parameter as a single text field
        const koboURL = `https://ee.kobotoolbox.org/x/BKTv4cRZ?geo location=${lat},${lng}`;

        // Open the Kobo form with the prefixed location data
        window.open(koboURL, '_blank');
    });
