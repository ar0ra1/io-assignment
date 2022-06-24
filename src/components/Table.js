import React, { useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Filters } from "./Filters";

const HEAD_CELLS = [
  { type: "string", label: "First Name", path: "name.first" },
  { type: "string", label: "Last Name", path: "name.last" },
  { type: "string", label: "Email", path: "email" },
  { type: "string", label: "Gender", path: "gender" },
  { type: "string", label: "Country", path: "location.country" },
  { type: "number", label: "Age", path: "dob.age" },
  { type: "date", label: "Date of Birth", path: "dob.date" },
];

export const Table = ({ data }) => {
  const [sortOn, setSortOn] = useState(HEAD_CELLS[0]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [filter, setFilter] = useState("");
  const navigate = useNavigate();

  if (!data) {
    throw new Error("Table: data is required");
  }

  const stringToObjPath = useCallback(
    (obj) =>
      sortOn.path.split(".").reduce((acc, curr) => acc && acc[curr], obj),
    [sortOn.path]
  );

  const sortStrings = useCallback(
    (dataSet) =>
      dataSet.sort((a, b) =>
        sortOrder === "asc"
          ? stringToObjPath(a).localeCompare(stringToObjPath(b))
          : stringToObjPath(b).localeCompare(stringToObjPath(a))
      ),
    [sortOrder, stringToObjPath]
  );

  const sortNumbers = useCallback(
    (dataSet) =>
      dataSet.sort((a, b) =>
        sortOrder === "asc"
          ? stringToObjPath(a) - stringToObjPath(b)
          : stringToObjPath(b) - stringToObjPath(a)
      ),
    [sortOrder, stringToObjPath]
  );

  const sortDates = useCallback(
    (dataSet) =>
      dataSet.sort((a, b) =>
        sortOrder === "asc"
          ? new Date(stringToObjPath(a)).valueOf() -
            new Date(stringToObjPath(b)).valueOf()
          : new Date(stringToObjPath(b)).valueOf() -
            new Date(stringToObjPath(a)).valueOf()
      ),
    [sortOrder, stringToObjPath]
  );

  const handleSort = useCallback(
    (cell) => {
      if (sortOn.label === cell.label) {
        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
      } else {
        setSortOn(cell);
        setSortOrder("asc");
      }
    },
    [sortOn, sortOrder]
  );

  const dataToDisplay = useMemo(() => {
    let newData = data;
    if (filter !== "") {
      newData = data.filter((user) => user.gender === filter);
    }
    switch (sortOn.type) {
      case "string":
        newData = sortStrings(newData);
        break;
      case "number":
        newData = sortNumbers(newData);
        break;
      case "date":
        newData = sortDates(newData);
        break;
      default:
        console.error("Unsupported Type");
        throw new Error("Unsupported Type");
    }
    return newData;
  }, [sortNumbers, sortStrings, sortOn, data, filter, sortDates]);

  const filterByGender = (gender) => setFilter(gender);

  const navigateToUserPage = (user) => {
    navigate("/single", { replace: false, state: user });
  };

  return (
    <main className="flex flex-col w-full overflow-auto">
      <Filters filterByGender={filterByGender} />
      <table
        data-testid="table"
        className="w-full overflow-x-auto text-sm text-left text-gray-500 dark:text-gray-400"
      >
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {HEAD_CELLS.map((c) => (
              <th
                onClick={() => handleSort(c)}
                key={c.label}
                className="px-6 py-3 text-white cursor-pointer whitespace-nowrap"
                scope="col"
              >
                {c.label}{" "}
                <span className="ml-5 text-xs text-gray-300">
                  {sortOn.label === c.label
                    ? sortOrder === "asc"
                      ? "ASC"
                      : "DESC"
                    : ""}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dataToDisplay.map((user) => (
            <tr
              onClick={() => navigateToUserPage(user)}
              key={user.login.uuid}
              data-testid={user.login.uuid}
              className="bg-white border-b cursor-pointer dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 whitespace-nowrap"
            >
              <td
                data-testid={`td-${user.login.uuid}-${user.name.first}`}
                className="px-6 py-4"
              >
                {user.name.first}
              </td>
              <td
                data-testid={`td-${user.login.uuid}-${user.name.last}`}
                className="px-6 py-4"
              >
                {user.name.last}
              </td>
              <td
                data-testid={`td-${user.login.uuid}-${user.email}`}
                className="px-6 py-4"
              >
                {user.email}
              </td>
              <td
                data-testid={`td-${user.login.uuid}-${user.gender}`}
                className="px-6 py-4 capitalize"
              >
                {user.gender}
              </td>
              <td
                data-testid={`td-${user.login.uuid}-${user.location.country}`}
                className="px-6 py-4"
              >
                {user.location.country}
              </td>
              <td
                data-testid={`td-${user.login.uuid}-${user.age}`}
                className="px-6 py-4"
              >
                {user.dob.age}
              </td>
              <td
                data-testid={`td-${user.login.uuid}-${user.dob.date}`}
                className="px-6 py-4"
              >
                {new Date(user.dob.date).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
};
