class Paginator {
	constructor(docs, limit) {
		this.nonFilteredDocs = docs;
		this.filteredDocs = docs;
		this.limit = limit;
		this.currentPage = 1;
	}

	at(page) {
		if (page > this.totalPages) { throw new Error('page must be betweet 1 and totalPages'); }
		this.currentPage = page;
		return this.filteredDocs.slice((page - 1) * this.limit, page * this.limit);
	}

	setFiltered(docs) {
		this.filteredDocs = docs;
		this.currentPage = 1;
		return this.at(this.currentPage);
	}

	resetFiltered() {
		this.filteredDocs = this.nonFilteredDocs;
		this.currentPage = 1;
	}

	getAllDocs() {
		return this.nonFilteredDocs;
	}

	get totalDocs() {
		return this.filteredDocs.length;
	}

	get totalPages() {
		return this.limit > 0 ? Math.ceil(this.totalDocs / this.limit) || 1 : 1;
	}
}

export default Paginator;