import { render, screen } from "@testing-library/react";
import { App } from "./App";

test("renders suspense with default layout", () => {
  render(<App />);
  // check if suspense is working
  const suspense = screen.getByTestId("suspense-loading");
  expect(suspense).toBeInTheDocument();

  const header = screen.getByTestId("headerContainer");
  expect(header).toBeInTheDocument();

  const footer = screen.getByTestId("footerContainer");
  expect(footer).toBeInTheDocument();
});
