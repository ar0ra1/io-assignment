import { render, screen } from "@testing-library/react";
import { AllUsers } from "./AllUsers";
import * as useRequest from "../lib/useRequest";

test("Check for loading state", () => {
  render(<AllUsers />);
  const loading = screen.getByTestId("data-loading");
  expect(loading).toBeInTheDocument();
});

test("SWR is called", () => {
  const mockGet = jest.spyOn(useRequest, "default");
  render(<AllUsers />);
  expect(mockGet).toHaveBeenCalled();
});
