const URL = "http://localhost:7000/api";
// const URL = 'https://url-shortner-eqti.onrender.com/api'

export const register = (data) => {
  return fetch(`${URL}/user/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

export const login = (data) => {
  return fetch(`${URL}/user/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

export const getUser = () => {
  return fetch(`${URL}/user/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${localStorage.getItem("token")}`,
    },
  });
};

export const updateUser = (data) => {
  return fetch(`${URL}/user/update`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(data),
  });
};

export const deleteUser = () => {
  return fetch(`${URL}/user/delete`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${localStorage.getItem("token")}`,
    },
  });
};

export const createShortLink = (data) => {
  return fetch(`${URL}/link/new-link`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(data),
  });
};

export const getUserLinks = ({
  limit,
  offset,
  remarks,
  isDatesSorted,
  isStatus,
}) => {
  return fetch(
    `${URL}/link/links?limit=${limit}&offset=${offset}&remarks=${remarks}&isDatesSorted=${isDatesSorted}&isStatus=${isStatus}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("token")}`,
      },
    }
  );
};

export const updateLink = (data) => {
  return fetch(`${URL}/link/update-link`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(data),
  });
};

export const deleteLink = (linkId) => {
  return fetch(`${URL}/link/delete/${linkId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${localStorage.getItem("token")}`,
    },
  });
};

export const getLinkAnalytics = ({ limit, offset }) => {
  return fetch(`${URL}/analyse/analytics?limit=${limit}&offset=${offset}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${localStorage.getItem("token")}`,
    },
  });
};

export const getClicksData = () => {
  return fetch(`${URL}/analyse/clicks`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${localStorage.getItem("token")}`,
    },
  });
};
