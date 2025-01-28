import React, { useEffect, useState } from "react";
import dropdown from "../assets/Dropdown.png";
import { getLinkAnalytics } from "../services";

const Analytics = () => {
  const [userLinks, setUserLinks] = useState([]);
  const [isdatesSorted, setIsDatesSorted] = useState(false);
  const [unsortedDates, setUnsortedDates] = useState([]);
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    showLinkAnalytics();
  }, [offset]);

  const showLinkAnalytics = async () => {
    const res = await getLinkAnalytics({ limit, offset: offset * limit });
    if (res.status === 200) {
      const data = await res.json(res);
      setUserLinks(data.analyticsData);
      setCount(data.totalLinks);
    } else {
      const data = await res.json(res);
      alert(data.message);
    }
  };

  const createdDate = (createdAt) => {
    const date = new Date(createdAt);
    const dateFormat = date
      .toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      })
      .replace(",", "");
    return dateFormat;
  };

  const showPageNumbers = () => {
    const totalPages = Math.ceil(count / limit);
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }

    return pages.map((page) => (
      <button key={page} onClick={() => setOffset(page - 1)}>
        {page}
      </button>
    ));
  };

  const sortDate = () => {
    setIsDatesSorted((prevState) => {
      const currentState = !prevState;
      if (currentState) {
        setUnsortedDates(userLinks);
        const sortedDates = [...userLinks].sort(
          (b, a) => new Date(a.createdAt) - new Date(b.createdAt)
        );
        setUserLinks(sortedDates);
      } else {
        setUserLinks(unsortedDates);
      }
      return currentState;
    });
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>
              Timestamp{" "}
              <img src={dropdown} alt="Sort Date" onClick={() => sortDate()} />
            </th>
            <th>Original Link</th>
            <th>Short Link</th>
            <th>ip address</th>
            <th>User Device</th>
          </tr>
        </thead>
        <tbody>
          {userLinks?.map((link) => {
            return (
              <tr key={link._id}>
                <td>{createdDate(link.createdAt)}</td>
                <td>{link.linkId.originalLink}</td>
                <td>{link.linkId.shortLink}</td>
                <td>{link.ipAddress}</td>
                <td>{link.device}</td>
              </tr>
            );
          })}
        </tbody>
        {count > 10 && (
          <button
            disabled={offset === 0}
            onClick={() => setOffset((prevOffset) => prevOffset - 1)}
          >
            Prev
          </button>
        )}
        {showPageNumbers()}
        {count > 10 && (
          <button
            disabled={offset * limit + limit >= count}
            onClick={() => setOffset((prevOffset) => prevOffset + 1)}
          >
            Next
          </button>
        )}
      </table>
    </div>
  );
};

export default Analytics;
