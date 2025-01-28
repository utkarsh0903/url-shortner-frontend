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
      console.log(data);
      setUserLinks(data.analyticsData);
      setCount(data.totalLinks);
    } else {
      const data = await res.json(res);
      alert(data.message);
    }
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>
              Timestamp <img src={dropdown} alt="Sort Date" />
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
                <td>{link.createdAt}</td>
                <td>{link.linkId.originalLink}</td>
                <td>{link.linkId.shortLink}</td>
                <td>{link.ipAddress}</td>
                <td>{link.device}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Analytics;
