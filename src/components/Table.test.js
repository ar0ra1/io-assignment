import { render, screen } from "@testing-library/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { ErrorBoundary } from "../ErrorBoundary";
import { Table } from "./Table";

const data = {
  gender: "female",
  name: { title: "Mrs", first: "Maddison", last: "Porter" },
  location: {
    street: { number: 7784, name: "North Street" },
    city: "Birmingham",
    state: "Dorset",
    country: "United Kingdom",
    postcode: "S6 1DH",
    coordinates: { latitude: "5.5797", longitude: "75.7853" },
    timezone: { offset: "+5:45", description: "Kathmandu" },
  },
  email: "maddison.porter@example.com",
  login: {
    uuid: "abacc814-0272-41e8-8111-c0b0df04fbc9",
    username: "bigrabbit155",
    password: "attitude",
    salt: "kBjf4Idf",
    md5: "61795b8d9cd1d8af011a90aacab6247b",
    sha1: "571273d7f74d36289a9410ccff9465a9e959835b",
    sha256: "aa0a112be8217ddb82207a4ef07bcc7640503a3dfe3a72b65f5a9302973c4644",
  },
  dob: { date: "1982-07-29T03:25:57.777Z", age: 40 },
  registered: { date: "2002-11-01T17:23:04.300Z", age: 20 },
  phone: "016974 97973",
  cell: "0783-995-735",
  id: { name: "NINO", value: "AN 35 59 29 F" },
  picture: {
    large: "https://randomuser.me/api/portraits/women/84.jpg",
    medium: "https://randomuser.me/api/portraits/med/women/84.jpg",
    thumbnail: "https://randomuser.me/api/portraits/thumb/women/84.jpg",
  },
  nat: "GB",
};

test("Check Error Boundary", () => {
  render(
    <MemoryRouter>
      <ErrorBoundary>
        <Table />
      </ErrorBoundary>
    </MemoryRouter>
  );
  expect(screen.getByTestId("error-boundary")).toBeVisible();
});

test("Happy Render", () => {
  render(
    <MemoryRouter>
      <Table data={[data]} />
    </MemoryRouter>
  );
  const table = screen.getByTestId("table");
  expect(table).toBeInTheDocument();

  const firstName = screen.getByTestId(
    `td-${data.login.uuid}-${data.name.first}`
  );
  expect(firstName).toBeInTheDocument();
  expect(firstName.textContent).toBe(data.name.first);

  const lastName = screen.getByTestId(
    `td-${data.login.uuid}-${data.name.last}`
  );
  expect(lastName).toBeInTheDocument();
  expect(lastName.textContent).toBe(data.name.last);

  const country = screen.getByTestId(
    `td-${data.login.uuid}-${data.location.country}`
  );
  expect(country).toBeInTheDocument();
  expect(country.textContent).toBe(data.location.country);

  const date = screen.getByTestId(`td-${data.login.uuid}-${data.dob.date}`);
  expect(date).toBeInTheDocument();
  expect(date.textContent).toBe(new Date(data.dob.date).toLocaleDateString());
});
