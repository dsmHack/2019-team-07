import React from "react";
// eslint-disable-next-line
import base from "./base.css";
import Footer from "../components/footer";
import Navigation from "../components/navigation";

class HomePageTemplate extends React.Component {
  render() {
    // eslint-disable-next-line
    const { location, children } = this.props;

    return (
      <div>
        <Navigation />
        {children}
        <Footer />
      </div>
    );
  }
}

export default HomePageTemplate;
