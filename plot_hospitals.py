import pandas as pd
import folium
from folium.plugins import MarkerCluster
import os

def generate_hospital_map(csv_path='pune_hospitals_corrected.csv', output_html='pune_hospitals_map.html'):
    # Check if file exists
    if not os.path.exists(csv_path):
        print(f"Error: {csv_path} not found.")
        return

    try:
        # Read the data
        df = pd.read_csv(csv_path)
    except Exception as e:
        print(f"Error reading CSV file: {e}")
        return

    # Basic error handling: drop rows with missing latitude or longitude
    df_clean = df.dropna(subset=['latitude', 'longitude'])

    if df_clean.empty:
        print("No valid latitude/longitude data found in the dataset to plot.")
        return

    # Calculate the center of the map
    center_lat = df_clean['latitude'].mean()
    center_lng = df_clean['longitude'].mean()

    # Initialize the map centered on Pune, optionally with a faster tileset or prefer_canvas
    pune_map = folium.Map(location=[center_lat, center_lng], zoom_start=12, prefer_canvas=True)

    # Function to determine marker color based on hospital_type
    def get_color(h_type):
        h_type = str(h_type).lower()
        if 'gov' in h_type or 'public' in h_type:
            return 'red'
        elif 'private' in h_type:
            return 'blue'
        else:
            return 'gray'

    # Iterate through the dataset and add markers
    for idx, row in df_clean.iterrows():
        lat = row['latitude']
        lng = row['longitude']
        name = row.get('name', 'Unknown Center')
        h_type = row.get('hospital_type', 'Unknown Type')
        beds = row.get('total_beds', 'N/A')

        # Create popup text
        popup_text = f"""
        <b>Name:</b> {name}<br>
        <b>Type:</b> {h_type}<br>
        <b>Total Beds:</b> {beds}
        """

        # Add Marker
        folium.CircleMarker(
            location=[lat, lng],
            radius=6,
            popup=folium.Popup(popup_text, max_width=300),
            tooltip=name,
            color=get_color(h_type),
            fill=True,
            fill_color=get_color(h_type),
            fill_opacity=0.7
        ).add_to(pune_map)

    # Save the map
    pune_map.save(output_html)
    print(f"Successfully created map and saved to {output_html}")

if __name__ == "__main__":
    generate_hospital_map()
