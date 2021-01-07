import React from "react";

import "./sign-up.styles.scss";

class SignUp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
    };
  }

  render() {
    return (
      <div className="sign-in">
        <h2>I already have an account</h2>
        <span>Sign in with your email and password</span>

        <form>
          <input name="email" type="email" value={this.state.email} required />
          <label>Email</label>
          <input
            name="password"
            type="password"
            value={this.state.password}
            required
          />
          <label>Password</label>
        </form>
      </div>
    );
  }
}

export default SignUp;
