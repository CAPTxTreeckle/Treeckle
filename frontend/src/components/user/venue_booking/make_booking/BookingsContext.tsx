import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { CONSOLE_LOGGING } from "../../../../DevelopmentView";
import { Venue } from "../booking-types";

type BookingsContextType = {
  selectedCategory: string;
  setSelectedCategory: (selectedCategory: string) => void;
};

export const BookingsContext = createContext<BookingsContextType>({
  selectedCategory: "",
  setSelectedCategory: (selectedCategory: string) => {},
});

type Props = {
  children: any;
};

const BookingsContextProvider = (props: Props) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCategoryVenues, setSelectedCategoryVenues] = useState<Venue[]>(
    []
  );

  return (
    <BookingsContext.Provider
      value={{
        selectedCategory,
        setSelectedCategory,
      }}
    >
      {props.children}
    </BookingsContext.Provider>
  );
};

export default BookingsContextProvider;
