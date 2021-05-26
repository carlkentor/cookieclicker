import React, { useMemo } from "react";
import { tools } from "data/tools";

const defaultState = {
  balance: 0,
  tools: tools,
};

export const UIContext = React.createContext(defaultState);

UIContext.displayName = "UIContext";

function uiReducer(state, action) {
  switch (action.type) {
    case "INCREMENT_BALANCE": {
      return {
        ...state,
        balance: action.value,
      };
    }
    case "DECREMENT_BALANCE": {
      return {
        ...state,
        balance: action.value,
      };
    }
    case "SELL_PRODUCT": {
      return {
        ...state,
        products: state.tools.map((p) =>
          p.id === action.id ? { ...p, owned: false } : p
        ),
      };
    }
    case "PURCHASE_PRODUCT": {
      return {
        ...state,
        products: state.tools.map((p) =>
          p.id === action.id ? { ...p, owned: true } : p
        ),
      };
    }
  }
}

export const UIProvider = (props) => {
  const [state, dispatch] = React.useReducer(uiReducer, defaultState);

  const incrementBalance = (value) => {
    return dispatch({ type: "INCREMENT_BALANCE", value });
  };

  const decrementBalance = (value) => {
    return dispatch({ type: "DECREMENT_BALANCE", value });
  };

  const sellTool = (id) => {
    const matchingTool = state.tools.filter((p) => p.id === id);
    if (matchingTool) {
      dispatch({
        type: "DECREMENT_BALANCE",
        value: (state.balance -= matchingTool.price),
      });
    } else {
      throw Error(`Unable to locate a tool with id: ${id}`);
    }
    return dispatch({ type: "SELL_TOOL", id });
  };

  const purchaseTool = (id) => {
    const matchingTool = state.tools.filter((p) => p.id === id);
    if (matchingTool) {
      dispatch({
        type: "DECREMENT_BALANCE",
        value: (state.balance += matchingTool.price),
      });
    } else {
      throw Error(`Unable to locate a tool with id: ${id}`);
    }
    return dispatch({ type: "PURCHASE_TOOL", id });
  };

  const value = useMemo(
    () => ({
      ...state,
      sellTool,
      purchaseTool,
      incrementBalance,
      decrementBalance,
    }),
    [state]
  );

  return <UIContext.Provider value={value} {...props} />;
};

export const useToolShop = () => {
  const context = React.useContext(UIContext);
  if (context === undefined) {
    throw new Error(`useToolShop must be used within a UIProvider`);
  }
  return context;
};

export const ToolShopContext = ({ children }) => (
  <UIProvider>{children}</UIProvider>
);
