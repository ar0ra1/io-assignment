import { act, render, screen } from "@testing-library/react";
import React from "react";
import { Filters } from "./Filters";

const mockFn = jest.fn();

test("Renders properly", () => {
  render(<Filters filterByGender={mockFn} />);

  const maleButtom = screen.getByTestId("maleButton");
  expect(maleButtom).toBeInTheDocument();

  const femaleButtom = screen.getByTestId("femaleButton");
  expect(femaleButtom).toBeInTheDocument();

  const resetButton = screen.getByTestId("resetButton");
  expect(resetButton).toBeInTheDocument();
});

test("Button Clicks", () => {
  render(<Filters filterByGender={mockFn} />);

  const maleButtom = screen.getByTestId("maleButton");
  act(() => {
    maleButtom.click();
  });
  expect(mockFn).toHaveBeenCalled();
  expect(mockFn).toHaveBeenCalledWith("male");

  const femaleButtom = screen.getByTestId("femaleButton");
  act(() => {
    femaleButtom.click();
  });
  expect(mockFn).toHaveBeenCalled();
  expect(mockFn).toHaveBeenCalledWith("female");

  const resetButton = screen.getByTestId("resetButton");
  act(() => {
    resetButton.click();
  });
  expect(mockFn).toHaveBeenCalled();
});
