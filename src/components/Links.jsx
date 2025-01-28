import React, { useEffect, useState } from "react";
import { deleteLink, getUserLinks } from "../services";
import dropdown from "../assets/Dropdown.png";
import copy from "../assets/copy-link.png";
import edit from "../assets/edit-link.png";
import deleteIcon from "../assets/delete-link.png";
import CreateLinkModal from "./CreateLinkModal";

const Links = ({ newLinkAdded, setNewLinkAdded }) => {
  const [userLinks, setUserLinks] = useState([]);
  const [isdatesSorted, setIsDatesSorted] = useState(false);
  const [isStatusSorted, setIsStatusSorted] = useState(false);
  const [unsortedDates, setUnsortedDates] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [clickedLink, setClickedLink] = useState(null);
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    showUserLinks();
  }, [newLinkAdded, offset]);

  const showUserLinks = async () => {
    const res = await getUserLinks({ limit, offset: offset * limit });
    if (res.status === 200) {
      const data = await res.json(res);
      setUserLinks(data.userLinks);
      setCount(data.totalLinks);
      setNewLinkAdded(false);
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
      } else {
        setUserLinks(unsortedDates);
      }
      return currentState;
    });
  };

  const handleCopy = (link) => {
    navigator.clipboard.writeText(link);
    alert("Link copied to clipboard!");
  };

  const handleEdit = (link) => {
    setClickedLink(link);
    setIsEditModalOpen(true);
  };

  const handleDelete = async (link) => {
    const res = await deleteLink(link._id);
    if (res.status === 200) {
      const data = await res.json(res);
      alert(data.message);
      setNewLinkAdded(true);
    } else {
      const data = await res.json(res);
      alert(data.message);
      setUserDetails(activeUser);
    }
  };

  const showPageNumbers = () => {
    const totalPages = Math.ceil(count/limit);
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  
    return pages.map((page) => (
      <button
        key={page}
        // className={`page-number ${offset === page - 1 ? "active" : ""}`}
        onClick={() => setOffset(page - 1)}
      >
        {page}
      </button>
    ));
  };

  const handleStatusSort = () => {
    setIsStatusSorted((prevState) => {
      const currentState = !prevState;
      if (currentState) {
        setUnsortedDates(userLinks);
        const sortedStatusLinks = [...userLinks].sort((a, b) => {
          const isActiveA = !a.expiryDate || new Date(a.expiryDate) > new Date();
          const isActiveB = !b.expiryDate || new Date(b.expiryDate) > new Date();
          return isActiveB - isActiveA;
        });
        setUserLinks(sortedStatusLinks);
      } else {
        setUserLinks(unsortedDates);
      }
      return currentState;
    });
  }

  return (
    <div className="link-container">
      <table>
        <thead>
          <tr>
            <th>
              Date{" "}
              <img src={dropdown} alt="Sort Date" onClick={() => sortDate()} />
            </th>
            <th>Original Link</th>
            <th>Short Link</th>
            <th>Remarks</th>
            <th>Clicks</th>
            <th>
              Status <img src={dropdown} alt="Sort status" onClick={() => handleStatusSort()} />
            </th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {userLinks?.map((link) => {
            return (
              <tr key={link._id}>
                <td>{createdDate(link.createdAt)}</td>
                <td>{link.originalLink}</td>
                <td>
                  {link.shortLink}{" "}
                  <img
                    src={copy}
                    alt="Copy Icon"
                    onClick={() => handleCopy(link.shortLink)}
                  />
                </td>
                <td>{link.remarks}</td>
                <td>{link.clicks}</td>
                <td>
                  {link.expiryDate
                    ? new Date(link.expiryDate) > new Date()
                      ? "Active"
                      : "Inactive"
                    : "Active"}
                </td>
                <td>
                  <img
                    src={edit}
                    alt="Edit Icon"
                    onClick={() => handleEdit(link)}
                  />
                  {isEditModalOpen && clickedLink && (
                    <CreateLinkModal
                      isEditModalOpen={isEditModalOpen}
                      setIsEditModalOpen={setIsEditModalOpen}
                      setNewLinkAdded={setNewLinkAdded}
                      originalURL={clickedLink.originalLink}
                      remarks={clickedLink.remarks}
                      expiryDate={clickedLink.expiryDate}
                      linkId={clickedLink._id}
                    />
                  )}
                  <img
                    src={deleteIcon}
                    alt="Delete Icon"
                    onClick={() => handleDelete(link)}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <button
        disabled={offset === 0}
        onClick={() => setOffset((prevOffset) => prevOffset - 1)}
      >
        Prev
      </button>
      {showPageNumbers()}
      <button
        disabled={offset * limit + limit >= count}
        onClick={() => setOffset((prevOffset) => prevOffset + 1)}
      >
        Next
      </button>
    </div>
  );
};

export default Links;
