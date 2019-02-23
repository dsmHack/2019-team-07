import netlifyIdentity from "netlify-identity-widget";
import React, { Component } from "react";

// helpful for debugging netlify identity
const logAuth = process.env.NODE_ENV === "development" && true; // set to true to turn on logging
const clog = (...args) => logAuth && console.log(...args);
// helpful for debugging netlify identity

const isBrowser = () => typeof window !== "undefined";

const getUser = () =>
	isBrowser() && window.localStorage.getItem("netlifyUser")
		? JSON.parse(window.localStorage.getItem("netlifyUser"))
		: {};

const setUser = (user) => window.localStorage.setItem("netlifyUser", JSON.stringify(user));

const handleLogin = (callback) => {
	clog("isLoggedIn check", isLoggedIn());
	if (isLoggedIn()) {
		clog("logged in");
		callback(getUser());
	} else {
		clog("logging in...");
		netlifyIdentity.open();
		netlifyIdentity.on("login", (user) => {
			clog("logged in!", { user });
			setUser(user);
			console.log("blah blah");
			callback(user);
		});
	}
};

const isLoggedIn = () => {
	if (!isBrowser()) return false;
	// const user = getUser()
	const user = netlifyIdentity.currentUser();
	clog("isLoggedIn check", { user });
	return !!user;
};

const handleLogout = (callback) => {
	netlifyIdentity.logout();
	netlifyIdentity.on("logout", () => {
		setUser({});
		callback();
	});
};

const initAuth = () => {
	if (isBrowser()) {
		window.netlifyIdentity = netlifyIdentity;
		// You must run this once before trying to interact with the widget
		netlifyIdentity.init();
	}
};

initAuth();
const defaultContext = {
	isLoggedIn: isLoggedIn(),
	login: () => {
		console.log("default");
	},
	logout: () => {
		console.log("default");
	}
};

export const AuthContext = React.createContext(defaultContext);

export class AuthProvider extends Component {
	state = {
		isLoggedin: isLoggedIn()
	};

	checkLogin(cb) {
		this.setState({ isLoggedIn: isLoggedIn() }, cb);
	}

	login(cb) {
		handleLogin(() => {
			window.location.reload();
		});
	}

	logout(cb) {
		handleLogout(() => {
			window.location.reload();
		});
	}

	componentDidMount() {
		this.checkLogin();
		console.log("provider mounted");
	}

	render() {
		console.log("provider render", this.state.isLoggedIn);
		return (
			<AuthContext.Provider
				value={{
					isLoggedIn: this.state.isLoggedin,
					login: this.login.bind(this),
					logout: this.logout.bind(this)
				}}
			>
				{this.props.children}
			</AuthContext.Provider>
		);
	}
}
