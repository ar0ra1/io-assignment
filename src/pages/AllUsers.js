import React, { useMemo, useState } from "react";
import { Table } from "../components/Table";
import useRequest from "../lib/useRequest";

const LIMIT = 20;

export const AllUsers = () => {
  const [isLoading, setIsLoading] = useState(true);

  const { data, error } = useRequest(
    `https://randomuser.me/api/?results=${LIMIT}`
  );

  useMemo(() => {
    if (data) {
      setIsLoading(false);
    }
  }, [data]);

  return error ? (
    <div data-testid={"error-loading"} className="text-2xl text-white">
      Error loading...
    </div>
  ) : isLoading ? (
    <div data-testid={"data-loading"} className="text-2xl text-white">
      Loading...
    </div>
  ) : (
    <Table data={data.results} />
  );
};
