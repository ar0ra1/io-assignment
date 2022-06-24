import { render, screen } from "@testing-library/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { SingleUser } from "./SingleUser";

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

test("renders properly", () => {
  render(
    <MemoryRouter
      initialEntries={[
        {
          state: data,
        },
      ]}
    >
      <SingleUser />
    </MemoryRouter>
  );
  const picture = screen.getByTestId("user-picture");
  expect(picture).toBeInTheDocument();
  expect(picture.src).toBe(data.picture.large);

  const basicDetails = screen.getByTestId("user-basicDetails");
  expect(basicDetails).toBeInTheDocument();
  expect(basicDetails.textContent).toBe(
    `${data.name.first} ${data.name.last} @${data.login.username}`
  );

  const dob = screen.getByTestId("user-dob");
  expect(dob).toBeInTheDocument();
  expect(dob.textContent).toBe(
    `Date of Birth: ${new Date(data.dob.date).toLocaleDateString()}`
  );
});

test("redirects to / if no data is passed", () => {
  jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useLocation: jest.fn(),
  }));
  render(
    <MemoryRouter
      initialEntries={[
        {
          state: null,
        },
      ]}
    >
      <SingleUser />
    </MemoryRouter>
  );
  const missingData = screen.getByTestId("missing-data");
  expect(missingData).toBeInTheDocument();
  expect(window.location.pathname).toBe("/");
});
