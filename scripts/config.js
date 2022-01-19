const config = {
	serverUrl: 'https://site202120.tw.cs.unibo.it',
	get serverApiUrl() { return `${this.serverUrl}/api`; }, 			// https://site202120.tw.cs.unibo.it/api    'http://localhost:3000/api'
	get serverImageUrl() { return `${this.serverUrl}/image`; },
	get employeesApiUrl() { return `${this.serverApiUrl}/employees`; },
	get customersApiUrl() { return `${this.serverApiUrl}/customers`; },
	get rentalsApiUrl() { return `${this.serverApiUrl}/rentals`; },
	get productsApiUrl() { return `${this.serverApiUrl}/products`; },
	get unitsApiUrl() { return `${this.serverApiUrl}/units`; },
	get billsApiUrl() { return `${this.serverApiUrl}/bills`; },
	get offersApiUrl() { return `${this.serverApiUrl}/offers`; },
	get paginatorLimit() { return 5; },
	get paginatorLimitRentals() { return 4; },
	loginTimeout: 5000,

	_user: null,
	async user() {
		if (this._user === null) {
			[this._loggedIn, this._user] = await this.checkTokenCustomer();
		}

		return this._user;
	},

	// TOKEN AND AUTHENTICATION
	getToken() {
		try {
			// diamo priorità al token nel sessionStorage, perché supponiamo essere più aggiornato
			return sessionStorage.getItem('authToken') || localStorage.getItem('authToken');
		} catch (err) {
			console.error(err);
			return undefined;
		}
	},
	setToken(token, remember = true) {
		try {
			this._tokenChanged = true;
			this._tokenChangedCustomer = true;
			this._tokenChangedEmployee = true;

			if (remember) localStorage.setItem('authToken', token);
			else sessionStorage.setItem('authToken', token);
		} catch (err) {
			console.error(err);
		}
	},

	getTokenCustomer() {
		try {
			// diamo priorità al token nel sessionStorage, perché supponiamo essere più aggiornato
			return sessionStorage.getItem('authTokenCust') || localStorage.getItem('authTokenCust');
		} catch (err) {
			console.error(err);
			return undefined;
		}
	},
	setTokenCustomer(token, remember = true) {
		try {
			this._tokenChanged = true;
			this._tokenChangedCustomer = true;
			this._tokenChangedEmployee = true;

			if (remember) localStorage.setItem('authTokenCust', token);
			else sessionStorage.setItem('authTokenCust', token);
		} catch (err) {
			console.error(err);
		}
	},

	getTokenEmployee() {
		try {
			// diamo priorità al token nel sessionStorage, perché supponiamo essere più aggiornato
			return sessionStorage.getItem('authTokenEmpl') || localStorage.getItem('authTokenEmpl');
		} catch (err) {
			console.error(err);
			return undefined;
		}
	},
	setTokenEmployee(token, remember = true) {
		try {
			this._tokenChanged = true;
			this._tokenChangedCustomer = true;
			this._tokenChangedEmployee = true;

			if (remember) localStorage.setItem('authTokenEmpl', token);
			else sessionStorage.setItem('authTokenEmpl', token);
		} catch (err) {
			console.error(err);
		}
	},

	_loggedIn: false,
	_tokenChanged: true,
	async loggedIn() {
		if (this._tokenChanged) {

			[this._loggedIn, this._user] = await this.checkToken();
			this._tokenChanged = false;
		}
		return this._loggedIn;
	},

	_loggedInEmployee: false,
	_tokenChangedEmployee: true,
	async loggedInEmployee() {
		if (this._tokenChangedEmployee) {

			[this._loggedInEmployee, this._user] = await this.checkTokenEmployee();
			this._tokenChangedEmployee = false;
		}
		return this._loggedInEmployee;
	},

	_loggedInCustomer: false,
	_tokenChangedCustomer: true,
	async loggedInCustomer() {
		if (this._tokenChangedCustomer) {

			[this._loggedInCustomer, this._user] = await this.checkTokenCustomer();
			this._tokenChangedCustomer = false;
		}
		return this._loggedInCustomer;
	},
	logout() {
		this.setToken('', false);
		this.setToken('', true);
		this.setTokenCustomer('', false);
		this.setTokenCustomer('', true);
		this.setTokenEmployee('', false);
		this.setTokenEmployee('', true);
	},
	async checkToken() { throw new Error('checkToken must be overwritten before use'); },
	async checkTokenEmployee() { throw new Error('checkToken must be overwritten before use'); },
	async checkTokenCustomer() { throw new Error('checkToken must be overwritten before use'); },
};

// TODO toglierelo
// FOR TESTING ONLY
// const serverMasterKey = 'armrp6OnNrjqYqe4WG0cta6pkOoGf1x/VekMnTNWP2vbhwfJsC68yYuWOoYSm4ijQm65zbq7Iafgcs5YeA4OBLQzqMjWqWWKkRWam2IHVUWC4M01w+ZsP6mzU0EdGviKEUAX99NoDv4S4DJXvMO6LfUQ0bWl24X/50eq3+OaJvr0ENPagpDmflUq4VwWyWx3Yuuvr37hLXPyZEDKzWNougQ3esR5CTlGuKF5jT3lrJv5R147de2gWql9kok0/Udt1upfLnh4N2GWaS+TjFWQUhXKLCciExfdsZrOSk/S4gEAYizsl1N1S6loZfJlt5IrfW+DE6Ojn0sLp3MMknr8tg==';
// config.setToken(serverMasterKey);

export default config;