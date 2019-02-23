import React from "react";
// eslint-disable-next-line
import base from "./base.css";
import Container from "../components/container";
import Footer from "../components/footer";
import Navigation from "../components/navigation";

class Template extends React.Component {
  render() {
    // eslint-disable-next-line
		const { children } = this.props;

    return (
      <div>
        <Navigation />

        <Container>{children}</Container>
        <Footer />
      </div>
    );
  }
}

export default Template;
