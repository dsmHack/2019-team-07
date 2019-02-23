import React from "react";
import base from "./base.css";
import Container from "../components/container";
import Navigation from "../components/navigation";
import Footer from "../components/footer";

class Template extends React.Component {
	render() {
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
