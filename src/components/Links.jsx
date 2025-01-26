import React, { useEffect, useState } from "react";
import { getUserLinks } from "../services";

const Links = () => {
  const [userLinks, setUserLinks] = useState([]);

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

  return (
    <div>
      {userLinks.map((link) => {
        return <h2 key={link._id}>{link.shortLink}</h2>;
      })}
    </div>
  );
};

export default Links;
