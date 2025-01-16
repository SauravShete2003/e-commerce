const getCurrentuser = () =>{
    const user = localStorage.getItem("e-commerce-user-details");
    if(!user) return null;
    return JSON.parse(user);
};
const getJwtToken = () =>{

    const token = localStorage.getItem("e-commerce-user-token");
    if (!token) return null;
    return `Bearer ${token}`;
};

const logOut = () =>{
    localStorage.clear();
    setTimeout(() => (window.location.href = "/login"), 1000);
};

export { getCurrentuser, getJwtToken, logOut };