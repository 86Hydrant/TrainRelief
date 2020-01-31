import React, { useState, useEffect } from "react";
import { myApiCall } from "../../services/TrainInfoService";
import traininfostyle from "./TrainInfoComponent.module.css";
import Greeter from "../Greeter/Greeter";

const TrainBrainAPI = () => {
  const myData = myApiCall();
  const [disruptions, onChangeDisruptions] = useState();
  const [accuracy, onChangeAccuracy] = useState();
  const [scheduled, onChangeScheduled] = useState();

  useEffect(() => {
    if (disruptions) {
      return;
    }

    myData.then(data => {
      let displayDelay = function() {
        const disruptedStation = data.prognosis.find(
          disruption => disruption.station === "Lu"
        );
        if (disruptedStation) {
          return disruptedStation.predicted_delay_minutes;
        } else {
          return 0;
        }
      };

      let displayAccuracy = function() {
        const disruptedStation = data.prognosis.find(
          disruption => disruption.station === "Lu"
        );
        if (disruptedStation) {
          return disruptedStation.predicted_delay_accuracy;
        } else {
          return 0;
        }
      };

      let displayScheduled = function() {
        const disruptedStation = data.prognosis.find(
          disruption => disruption.station === "Lu"
        );
        if (disruptedStation) {
          let stationArray = disruptedStation.scheduled.split("");
          return stationArray.splice(0, 5);
        } else {
          return 0;
        }
      };

      onChangeDisruptions(displayDelay);
      onChangeAccuracy(displayAccuracy);
      onChangeScheduled(displayScheduled);
    });
  });

  return (
    <div className={traininfostyle.infoComponent}>
      <div className={traininfostyle.greeter}>
        <Greeter />
      </div>
      <h1 className={traininfostyle.travelInfo}>TRAVEL INFORMATION</h1>
      <h2 className={traininfostyle.styleLarge}>LUND C</h2>
      <h3 className={traininfostyle.styleSmall}>NEXT TRAIN</h3>
      <h4 className={traininfostyle.styleLarge} id={traininfostyle.time}>
        {scheduled}
      </h4>

      {disruptions === "0" && accuracy === "100%" ? (
        <p className={traininfostyle.delayInfo}>NO DELAYS</p>
      ) : (
        <p className={traininfostyle.delayInfo}>
          {disruptions} MIN DELAY<br></br>
          {accuracy} ACCURACY{" "}
        </p>
      )}
    </div>
  );
};

export default TrainBrainAPI;
