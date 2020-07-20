import { useEffect, useState } from "react";
import { GetUser } from "../api/services/UserService";
import { useCookies } from "react-cookie";
// import { connect } from "react-redux";
import { fetchUser } from "../state/user/userTypes";
import { useDispatch } from "react-redux";

const useAuthentication = () => {
  const [loading, setLoading] = useState(true);
  const [cookies] = useCookies();
  const dispatch = useDispatch();
  useEffect(() => {
    setLoading(true);
    if (!cookies.csrftoken) {
      setLoading(false);
    } else {
      GetUser()
        .then((res) => {
          dispatch(fetchUser(res.data));
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  }, [cookies.csrftoken, dispatch]);

  return loading;
};

export default useAuthentication;
