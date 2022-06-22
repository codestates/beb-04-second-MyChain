import { useState, useEffect } from "react";

function SignUp() {
  return (
    <div>
      <nav>
        <div>
          <h1>회원가입</h1>
        </div>
        <div>
          <input type="text" name="email" />
        </div>
        <div>
          <input type="password" name="pwd" />
        </div>
        <div>
          <input type="password" name="pwd_chk" />
        </div>
        <div>
          <input type="text" name="nick_name" />
        </div>
      </nav>
    </div>
  );
}

export default SignUp;
