import React, { useEffect, useState } from "react";
import dropdown from "../assets/Dropdown.png";
import { getLinkAnalytics } from "../services";
import "../styles/analytics.css";

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
    <div className="analytic-container">
      <table>
        <thead>
          <tr>
            <th className="analytic-date">
              Timestamp{" "}
              <img src={dropdown} alt="Sort Date" onClick={() => sortDate()} />
            </th>
            <th className="analytic-original">Original Link</th>
            <th className="analytic-shortlink">Short Link</th>
            <th className="analytic-ipaddress">ip address</th>
            <th className="analytic-device">User Device</th>
          </tr>
        </thead>
        <tbody>
          {userLinks.length == 0 ? <p className="no-data">No data found</p> :userLinks?.map((link) => {
            return (
              <tr key={link._id}>
                <td className="analytic-data-date">
                  {createdDate(link.createdAt)}
                </td>
                <td className="analytic-data-original">
                  {link.linkId.originalLink}
                </td>
                <td className="analytic-data-shortlink">
                  {link.linkId.shortLink}
                </td>
                <td className="analytic-data-ipaddress">{link.ipAddress}</td>
                <td className="analytic-data-device">{link.device}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {count > 10 && (
        <div className="link-paging">
          <button
            className={offset === 0 ? "disabled" : ""}
            disabled={offset === 0}
            onClick={() => setOffset((prevOffset) => prevOffset - 1)}
          >
            &lt;
          </button>
          {showPageNumbers()}
          <button
            className={offset * limit + limit >= count ? "disabled" : ""}
            disabled={offset * limit + limit >= count}
            onClick={() => setOffset((prevOffset) => prevOffset + 1)}
          >
            &gt;
          </button>
        </div>
      )}
    </div>
  );
};

export default Analytics;
