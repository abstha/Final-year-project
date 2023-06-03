import * as React from "react";
import "./Map.css";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import L from "leaflet";
import { Container } from "@mui/material";
import Rating from "@mui/material/Rating";
import Searchbox from "../../components/MapSearch/Searchbox";
import Navbar from "../../components/Navbar/Navbar";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { toast, ToastContainer } from "react-toastify";

const icon = L.icon({
  iconUrl: "./placeholder.png",
  iconSize: [20, 30],
});

function ResetCenterView(props) {
  const { selectPosition } = props;
  const mapa = useMap();

  React.useEffect(() => {
    if (selectPosition) {
      mapa.setView(
        L.latLng(selectPosition?.lat, selectPosition?.lon),
        mapa.getZoom(),
        {
          animate: true,
        }
      );
    }
  }, [mapa, selectPosition]);

  return null;
}

export default function MapPage() {
  const [selectPosition, setSelectPosition] = React.useState(null);
  console.log(selectPosition);

  const locationSelection = [selectPosition?.lat, selectPosition?.lon];

  const position = [27.71724, 85.323958];
  const [value, setValue] = React.useState(2);

  const [pins, setPins] = React.useState([]);

  React.useEffect(() => {
    const getPins = async () => {
      try {
        const username = JSON.parse(localStorage.getItem("user"));
        const response = await axios.get(
          "http://localhost:5000/api/pins/getPins"
        );
        const userPins = response.data.filter(
          (pin) => pin.userName === username
        );
        setPins(userPins);
        console.log(userPins);
      } catch (err) {
        console.log(err);
      }
    };

    getPins();
  }, []);

  const handleAddBm = async (e) => {
    e.preventDefault();
    const username = JSON.parse(localStorage.getItem("user"));
    const formData = new FormData(e.target);
    const place = formData.get("name");
    const description = formData.get("description");
    const rat = formData.get("rating");
    const lat = formData.get("lat");
    const lon = formData.get("lon");
    // Add the bookmark with the lat, lon, name, description, and rating values
    const addBm = {
      userName: username,
      title: place,
      rating: rat,
      lat: lat,
      lon: lon,
      descr: description,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/pins/bookmarks",
        addBm
      );
      console.log(response);
      toast.success("Successfully added bookmarks", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (err) {
      console.log(err);
      toast.error("Failed to add bookmark", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <Container>
      <div className="Mapmain">
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <Grid2 container>
          <Grid2 xs={12}>
            <Navbar />
          </Grid2>
          <Grid2 xs={8}>
            <div className="Map">
              <MapContainer
                center={position}
                zoom={13}
                style={{ width: "100%", height: "100%" }}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=OLZ4vAw1pdYmBS5M3Q3h"
                />
                {selectPosition && (
                  <Marker position={locationSelection} icon={icon}>
                    <Popup>
                      <div className="Add bm">
                        <form onSubmit={handleAddBm}>
                          <h3>Title:</h3>
                          <input
                            type="text"
                            placeholder="title"
                            name="name"
                          ></input>
                          <h3>Description:</h3>
                          <input
                            type="text"
                            placeholder="description"
                            name="description"
                          ></input>
                          <h3>Rating:</h3>
                          <input
                            type="number"
                            placeholder="rating"
                            name="rating"
                          ></input>
                          <input
                            type="hidden"
                            name="lat"
                            value={selectPosition?.lat}
                          />
                          <input
                            type="hidden"
                            name="lon"
                            value={selectPosition?.lon}
                          />
                          <button type="submit"> Add bm</button>
                        </form>
                      </div>
                    </Popup>
                  </Marker>
                )}
                <ResetCenterView selectPosition={selectPosition} />
                {pins.map((p) => (
                  <Marker key={p._id} position={[p.lon, p.lat]} icon={icon}>
                    <Popup>
                      <div className="bm_title">
                        <h3>Title</h3>
                        <h4>{p.title}</h4>
                      </div>
                      <div className="bm_rating">
                        <h3>Rating</h3>
                        <Rating name="read-only" value={p.rating} readOnly />
                      </div>
                      <div className="bm_descr">
                        <h3>Description</h3>
                        <h4>{p.descr}</h4>
                      </div>
                      <div className="bm_info">
                        <h3>Info</h3>
                        <span>
                          Created by: <b>{p.userName}</b>
                        </span>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>
          </Grid2>
          <Grid2 xs={4}>
            <div className="Search">
              <Searchbox
                selectPosition={selectPosition}
                setSelectPosition={setSelectPosition}
              />
            </div>
          </Grid2>
        </Grid2>
      </div>
    </Container>
  );
}
