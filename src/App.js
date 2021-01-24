import React from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";

import HomePage from "./pages/homepage/homepage.component.jsx";
import ShopPage from "./pages/shop/shop.component.jsx";
import Header from "../src/components/header/header.component.jsx";
import SignInAndSignUpPage from "./pages/sign-in-sign-up/sign-in-sign-up.component";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import { render } from "@testing-library/react";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      currentUser: null,
    };
  }

  unSubscribeFromAuth = null;

  // componentDidMount() {
  //   this.unSubscribeFromAuth = auth.onAuthStateChanged((user) => {
  //     createUserProfileDocument(user);
  //     //open subscription is an open messaging system between our
  //     //application and our firebase. Whenever any changes occur on Firebase from any source
  //     //related to this app, Firebase sends out a message that says the Auth status changes
  //     this.setState({ currentUser: user });
  //     // console.log(user);
  //   });
  // }

  componentDidMount() {
    this.unSubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        //Check if our database has updated at that reference with any new data
        //Similar to onAuthStateChanged, we call onSnapshot
        userRef.onSnapshot((snapShot) => {
          this.setState({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data(),
            },
          });
        });
      } else {
        this.setState({ currentUser: userAuth });
      }
    });
  }

  componentWillUnmount() {
    this.unSubscribeFromAuth(); //close the subscription
  }

  render() {
    return (
      <div className="App">
        <Header currentUser={this.state.currentUser} />
        <Switch>
          {/* Switch is used to prevent rendering 2 pages at a time. 
        The moment it sees some URL match, it's gonna render that page
      and ignore all others */}
          <Route exact path="/" component={HomePage} />
          {/* if we don't have exact (a boolean value), the URL ends with
      "/hats" will also show up the HomePage */}
          <Route path="/shop" component={ShopPage} />
          <Route path="/signin" component={SignInAndSignUpPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
