import React, { createContext } from "react";

export const initialState = {
    todo: {
      groupToDo: [],
      item: {}
    }
  };
  
export const Store = createContext(initialState);