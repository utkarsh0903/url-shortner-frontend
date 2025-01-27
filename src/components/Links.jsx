import React, { useEffect, useState } from "react";
import { getUserLinks } from "../services";
import dropdown from "../assets/Dropdown.png";
import copy from "../assets/copy-link.png";
import edit from "../assets/edit-link.png";
import deleteIcon from "../assets/delete-link.png";

const Links = () => {
  const [userLinks, setUserLinks] = useState([]);
  const [isdatesSorted, setIsDatesSorted] = useState(false);
  const [unsortedDates, setUnsortedDates] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    showUserLinks();
  }, []);

  const showUserLinks = async () => {
    const res = await getUserLinks();
    if (res.status === 200) {
      const data = await res.json(res);
      setUserLinks(data.userLinks);
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

  const sortDate = () => {
    setIsDatesSorted((prevState) => {
      const currentState = !prevState;
      if (currentState) {
        setUnsortedDates(userLinks);
        const sortedDates = [...userLinks].sort(
          (b, a) => new Date(a.createdAt) - new Date(b.createdAt)
        );
        setUserLinks(sortedDates);
      }
      else{
        setUserLinks(unsortedDates);
      }
      return currentState;
    })
  };

  return (
    <div className="link-container">
      <table>
        <thead>
          <tr>
            <th>
              Date{" "}
              <img
                src={dropdown}
                alt="Sort Date"
                onClick={() => sortDate()}
              />
            </th>
            <th>Original Link</th>
            <th>Short Link</th>
            <th>Remarks</th>
            <th>Clicks</th>
            <th>
              Status <img src={dropdown} alt="Sort status" />
            </th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {userLinks.map((link) => {
            return (
              <tr key={link._id}>
                <td>{createdDate(link.createdAt)}</td>
                <td>{link.originalLink}</td>
                <td>
                  {link.shortLink} <img src={copy} alt="Copy Icon" />
                </td>
                <td>{link.remarks}</td>
                <td>0</td>
                <td>{link.expiryDate}</td>
                <td>
                  <img src={edit} alt="Edit Icon" />{" "}
                  <img src={deleteIcon} alt="Delete Icon" />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Links;
