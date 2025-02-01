import React, { useEffect, useState } from "react";
import { deleteLink, getUserLinks } from "../services";
import dropdown from "../assets/Dropdown.png";
import copy from "../assets/copy-link.png";
import edit from "../assets/edit-link.png";
import deleteIcon from "../assets/delete-link.png";
import CreateLinkModal from "./CreateLinkModal";
import "../styles/links.css";
import DeleteModal from "./DeleteModal";

const Links = ({ newLinkAdded, setNewLinkAdded, search }) => {
  const [userLinks, setUserLinks] = useState([]);
  const [isDatesSorted, setIsDatesSorted] = useState(false);
  const [showStatusOptions, setShowStatusOptions] = useState(false);
  const [isStatus, setIsStatus] = useState("all");
  // const [unsortedDates, setUnsortedDates] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [linkDeleteModalOpen, setLinkDeleteModalOpen] = useState(false);
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
  }, [newLinkAdded, offset, search, isDatesSorted, isStatus]);

  const showUserLinks = async () => {
    const res = await getUserLinks({
      limit,
      offset: offset * limit,
      remarks: search,
      isDatesSorted,
      isStatus,
    });
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
    setIsDatesSorted((prev) => !prev);
  };

  const handleCopy = (link) => {
    navigator.clipboard.writeText(link);
    alert("Link copied to clipboard!");
  };

  const handleEdit = (link) => {
    setClickedLink(link);
    setIsEditModalOpen(true);
  };

  const handleDelete = (link) => {
    setClickedLink(link);
    setLinkDeleteModalOpen(true);
  };

  const finalDelete = async () => {
    if (clickedLink) {
      const res = await deleteLink(clickedLink._id);
      if (res.status === 200) {
        const data = await res.json();
        alert(data.message);
        setNewLinkAdded(true);
      } else {
        const data = await res.json();
        alert(data.message);
      }
    }
    setLinkDeleteModalOpen(false);
  };

  const showPageNumbers = () => {
    const totalPages = Math.ceil(count / limit);
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }

    return pages.map((page) => (
      <button
        key={page}
        className={`page-number ${
          offset === page - 1 ? "page-active" : "page-inactive"
        }`}
        onClick={() => setOffset(page - 1)}
      >
        {page}
      </button>
    ));
  };

  const handleStatusSort = () => {
    setShowStatusOptions((prev) => !prev);
  };

  const handleSelectStatus = (e) => {
    setIsStatus(e.target.value);
    setShowStatusOptions(false);
  }

  return (
    <div className="link-container">
      <table className="link-table">
        <thead>
          <tr>
            <th className="link-date">
              Date{" "}
              <img src={dropdown} alt="Sort Date" onClick={() => sortDate()} />
            </th>
            <th className="link-original">Original Link</th>
            <th className="link-shortlink">Short Link</th>
            <th className="link-remarks">Remarks</th>
            <th className="link-clicks">Clicks</th>
            <th className="link-status">
            
              Status{" "}{showStatusOptions && (
                <div className="status-filter-dropdown">
                  <select
                    value={isStatus}
                    onChange={(e) => handleSelectStatus(e)}
                    className="status-dropdown"
                  >
                    <option value="all">All</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              )}
              <img
                src={dropdown}
                alt="Sort status"
                onClick={() => handleStatusSort()}
              />
              
            </th>
            <th className="link-actions">Action</th>
          </tr>
        </thead>
        <tbody>
          {userLinks.length == 0 ? (
            <tr className="no-data">
              <td>No data found</td>
            </tr>
          ) : (
            userLinks?.map((link) => {
              return (
                <tr key={link._id}>
                  <td className="link-data-date">
                    {createdDate(link.createdAt)}
                  </td>
                  <td className="link-data-original">{link.originalLink}</td>
                  <td className="link-data-shortlink">
                    {link.shortLink}{" "}
                    <img
                      src={copy}
                      alt="Copy Icon"
                      onClick={() => handleCopy(link.shortLink)}
                    />
                  </td>
                  <td className="link-data-remarks">{link.remarks}</td>
                  <td className="link-data-clicks">{link.clicks}</td>
                  <td
                    className={`link-data-status ${
                      link.expiryDate
                        ? new Date(link.expiryDate) > new Date()
                          ? "active"
                          : "inactive"
                        : "active"
                    }`}
                  >
                    {link.expiryDate
                      ? new Date(link.expiryDate) > new Date()
                        ? "Active"
                        : "Inactive"
                      : "Active"}
                  </td>
                  <td className="link-data-actions">
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
                    {linkDeleteModalOpen && (
                      <DeleteModal
                        setLinkDeleteModalOpen={setLinkDeleteModalOpen}
                        linkDeleteModalOpen={linkDeleteModalOpen}
                        finalDelete={finalDelete}
                      />
                    )}
                  </td>
                </tr>
              );
            })
          )}
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

export default Links;
