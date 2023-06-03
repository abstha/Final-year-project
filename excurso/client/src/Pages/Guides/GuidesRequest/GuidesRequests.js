import React, { useState, useEffect } from "react";
import Guidesnav from "../../../components/GuidesNav/Guidesnav";
import "./GuidesRequest.css";
import axios from "axios";
import { Button, Container } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import BlockIcon from "@mui/icons-material/Block";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const GuidesRequests = () => {
  const [bookings, setBookings] = useState([]);

  const guideId = localStorage.getItem("GuideID"); // get guide ID from local storage

  useEffect(() => {
    // axios.get(`http://localhost:5000/api/bookings/${guideId}`)
    axios
      .get(`http://localhost:5000/api/bookings?guideId=${guideId}`)
      .then((response) => {
        setBookings(response.data);
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [guideId]);

  const handleAccepted = (bookingId) => {
    const booking = bookings.find((booking) => booking._id === bookingId);
    if (booking.status === "accepted" || booking.status === "rejected") {
      toast.error("Booking status cannot be changed");
      return;
    }
    axios
      .put(`http://localhost:5000/api/bookings/${bookingId}`, {
        status: "accepted",
      })
      .then((response) => {
        console.log(response.data);
        toast.success("Booking accepted successfully");
        // Update bookings state or do any other necessary action
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleRejected = (bookingId) => {
    const booking = bookings.find((booking) => booking._id === bookingId);
    if (booking.status === "accepted" || booking.status === "rejected") {
      toast.error("Booking status cannot be changed");
      return;
    }
    axios
      .put(`http://localhost:5000/api/bookings/${bookingId}`, {
        status: "rejected",
      })
      .then((response) => {
        console.log(response.data);
        toast.success("Booking rejected successfully");
        // Update bookings state or do any other necessary action
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <Container>
      <ToastContainer />
      <div className="guide-request"></div>
      <div className="guidesnav">
        <Guidesnav />
      </div>
      <div className="request">
        <h1>Requests available</h1>
        {bookings.map((booking) => (
          <div key={booking._id} className="request-Card">
            <div className="guidedetail">
              <p>
                <h3>date requested on:</h3> {booking.date}
              </p>
              <p>
                <h3>duration:</h3> {booking.duration} hours
              </p>
              <p className={`booking-status booking-${booking.status}`}>
                <h3>Status:</h3> {booking.status}
              </p>
              <p>
                <h3>Booked by: </h3>
                {booking.userName}
              </p>
              <p>
                <h3>Total Charge: </h3> Rs. {booking.totalCost}
              </p>
            </div>
            <div className="booking-confirm">
              <Button
                variant="standard"
                onClick={() => handleAccepted(booking._id)}
                startIcon={<CheckIcon />}
                sx={{ bgcolor: "#4db8ff" }}
              >
                {" "}
                Accept
              </Button>
              <Button
                variant="standard"
                onClick={() => handleRejected(booking._id)}
                endIcon={<BlockIcon />}
                sx={{ bgcolor: "#4db8ff", marginTop: "20px" }}
              >
                Reject
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default GuidesRequests;
