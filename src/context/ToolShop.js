import React, { useMemo } from "react";
import { tools } from "data/tools";

const defaultState = {
  balance: 0,
  tools: tools,
  inventory: [],
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
    case "SELL_TOOL": {
      const updateInventory = (id, state) => {
        const inventoryClone = [...state.inventory];
        const index = inventoryClone.findIndex((x) => x.id === id);
        if (index > -1) {
          inventoryClone.splice(index, 1);
        }
        return inventoryClone;
      };
      const updateTools = (tool, state) => {
        const toolsClone = [...state.tools];
        let inszertAtIndex = 0;
        toolsClone.splice(inszertAtIndex, 0, tool);
        return toolsClone;
      };
      return {
        ...state,
        tools: updateTools(action.tool, state),
        inventory: updateInventory(action.id, state),
      };
    }
    case "PURCHASE_TOOL": {
      const updateTools = (id, state) => {
        const toolsClone = [...state.tools];
        const index = toolsClone.findIndex((x) => x.id === id);
        if (index > -1) {
          toolsClone.splice(index, 1);
        }
        return toolsClone;
      };
      const updateInventory = (tool, state) => {
        const inventoryClone = [...state.inventory];
        inventoryClone.push(tool);
        return inventoryClone;
      };
      return {
        ...state,
        tools: updateTools(action.id, state),
        inventory: updateInventory(action.tool, state),
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
    const matchingTool = state.inventory.filter((p) => p.id === id);
    if (matchingTool) {
      const newBalance = (state.balance += matchingTool[0].price);
      dispatch({
        type: "INCREMENT_BALANCE",
        value: newBalance,
      });
    } else {
      throw Error(`Unable to locate a tool with id: ${id}`);
    }
    return dispatch({ type: "SELL_TOOL", id, tool: matchingTool[0] });
  };

  const purchaseTool = (id) => {
    const matchingTool = state.tools.filter((p) => p.id === id);
    if (matchingTool) {
      const newBalance = (state.balance -= matchingTool[0].price);
      dispatch({
        type: "DECREMENT_BALANCE",
        value: newBalance,
      });
    } else {
      throw Error(`Unable to locate a tool with id: ${id}`);
    }
    return dispatch({ type: "PURCHASE_TOOL", id, tool: matchingTool[0] });
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
