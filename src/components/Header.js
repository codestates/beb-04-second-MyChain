import React from "react";
import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <div>
      <li>
        <NavLink to="/SignUp">SignUp</NavLink>
      </li>
      <li>
        {/* <NavLink to="/SignUp">SignUp</NavLink> */}
        로그인
      </li>
      {/* <li>
                <NavLink to="/SignUp">SignUp</NavLink>
            </li>
            <li>
                <NavLink to="/SignUp">SignUp</NavLink>
            </li> */}
    </div>
  );
}
