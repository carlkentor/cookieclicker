import React from "react";
import { ToolShopContext, useToolShop } from "context";

import { CookieIncrementer } from "components/ui";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("<CookieIncrementer />", () => {
  beforeEach(() => {
    render(
      <ToolShopContext>
        <CookieIncrementer />
      </ToolShopContext>
    );
  });

  it("then exists after mount", () => {
    expect(screen.getByTestId("increment_current_balance")).toBeTruthy();
  });

  it("then has a balance of zero", () => {
    expect(screen.getByTestId("current_balance")).toHaveTextContent(0);
  });

  describe("when CookieIncrementer call to action ctrl gets clicked", () => {
    let balance = null;
    beforeEach(() => {
      const elem = screen.getByTestId("current_balance");
      balance = parseInt(elem.textContent);
      userEvent.click(screen.getByTestId("increment_current_balance"));
    });
    it("then increments the value and renders it", () => {
      const elem = screen.getByTestId("current_balance");
      expect(elem).toHaveTextContent(balance + 1);
    });
  });
});
