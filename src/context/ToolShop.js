import React, { useMemo } from "react";
import { tools } from "data/tools";

const defaultState = {
  balance: 0,
  tools: tools,
  inventory: [],
  currentMultiplier: 1,
};

export const UIContext = React.createContext(defaultState);

UIContext.displayName = "UIContext";

const isClickableItem = (tool) =>
  tool && tool.hasOwnProperty("clickMultiplier");

const reCalcMultiplier = (inventory) => {
  const clickableItems = inventory.filter((x) =>
    x.hasOwnProperty("clickMultiplier")
  );
  return clickableItems
    .map((x) => x.clickMultiplier)
    .reduce((a, b) => a + b, 0);
};

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

    case "INCREMENT_CURR_MULTIPLIER": {
      const { tool } = action;
      console.log("TTOOl", tool);
      let multiplier = state.currentMultiplier;
      if (isClickableItem(tool)) {
        const clone = [...state.inventory, tool];
        multiplier = reCalcMultiplier(clone);
      }
      return {
        ...state,
        currentMultiplier: multiplier || 1,
      };
    }
    case "DECREMENT_CURR_MULTIPLIER": {
      const { tool } = action;
      let multiplier = state.currentMultiplier;
      if (isClickableItem(tool)) {
        const clone = [...state.inventory];
        const index = clone.findIndex((x) => x.id === tool.id);
        if (index > -1) {
          delete clone[index];
          multiplier = reCalcMultiplier(clone);
        }
      }
      return {
        ...state,
        currentMultiplier: multiplier || 1,
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

  const incrementMultiplier = (value) => {
    return dispatch({ type: "INCREMENT_CURR_MULTIPLIER", value });
  };

  const decrementMultiplier = (value) => {
    return dispatch({ type: "DECREMENT_CURR_MULTIPLIER", value });
  };

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
      dispatch({
        type: "DECREMENT_CURR_MULTIPLIER",
        tool: matchingTool[0],
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

      dispatch({
        type: "INCREMENT_CURR_MULTIPLIER",
        tool: matchingTool[0],
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
      incrementMultiplier,
      decrementMultiplier,
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
