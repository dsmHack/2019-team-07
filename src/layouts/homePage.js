import React from 'react';

import Footer from '../components/footer';
import Navigation from '../components/navigation';

class HomePageTemplate extends React.Component {
	render() {
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
