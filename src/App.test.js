import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders hello", () => {
  render(<App />);
  const gridElem = screen.getByTestId("grid");
  expect(gridElem).toBeInTheDocument();
});
