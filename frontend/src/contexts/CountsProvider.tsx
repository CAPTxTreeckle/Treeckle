import React, { createContext, useState, useEffect, useContext } from "react";
import { Context } from "./UserProvider";
import axios from "axios";
import { CONSOLE_LOGGING } from "../DevelopmentView";

export type setCountsType = (
  pendingRoomBookingsParam: number | null,
  updaterParam: boolean | null,
  runOnceParam: boolean | null
) => void;

type CountsContextType = {
  pendingRoomBookings: number;
  updater: boolean;
  runOnce: boolean;
  setCounts: setCountsType;
};

export const CountsContext = createContext<CountsContextType>({
  pendingRoomBookings: 0,
  updater: false,
  runOnce: false,
  setCounts: (
    pendingRoomBookingsParam: number | null,
    updaterParam: boolean | null,
    runOnceParam: boolean | null
  ) => {},
});

type Props = {
  children: any;
};

const CountsContextProvider = (props: Props) => {
  const [pendingRoomBookings, setPendingRoomBookings] = useState(0);
  const [updater, setUpdater] = useState(false);
  const [runOnce, setRunOnce] = useState(false);
  const userContext = useContext(Context);

  const setCounts = (
    pendingRoomBookingsParam: number | null,
    updaterParam: boolean | null,
    runOnceParam: boolean | null
  ) => {
    if (pendingRoomBookingsParam !== null) {
      setPendingRoomBookings(pendingRoomBookingsParam);
    }
    if (updaterParam !== null) {
      setUpdater(updaterParam);
    }
    if (runOnceParam !== null) {
      setRunOnce(runOnceParam);
    }
  };

  useEffect(() => {
    if (userContext.token) {
      updatePendingRoomBookings();
    }
  }, [pendingRoomBookings, updater]);

  const updatePendingRoomBookings = () => {
    axios
      .get("/api/rooms/bookings/all/count", {
        headers: { Authorization: `Bearer ${userContext.token}` },
      })
      .then((response: any) => {
        if (pendingRoomBookings !== response) {
          setPendingRoomBookings(response.data);
          // setCounts({ pendingRoomBookings: response.data });
        }
      })
      .catch((err) => {
        CONSOLE_LOGGING && console.log(err);
      });
  };

  return (
    <CountsContext.Provider
      value={{ pendingRoomBookings, updater, runOnce, setCounts }}
    >
      {props.children}
    </CountsContext.Provider>
  );
};

export default CountsContextProvider;
