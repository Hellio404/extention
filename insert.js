async function get_better_search() {
	const urlParams = new URLSearchParams(window.location.search);
	const query = urlParams.get('query');
	console.log("woooo", query);
	if (query !== null && query.length < 3)
		return [];
	try {
		let res = await fetch("https://localhost:8000/users/search?q=" + query, {
			method: "GET",
			credentials: 'include',
		});
		if (res.status === 401) {
			return {
				error: "Unauthorized"
			}
		}
		let data = await res.json();
		return { data };
	} catch (error) {
		return {
			error: error
		}
	}
}

function add_checkbox(name, checked, callback) {
	let checkbox = document.createElement("input");
	checkbox.type = "checkbox";
	checkbox.id = "same-campus";
	checkbox.checked = checked;
	checkbox.addEventListener("change", (e) => callback(e.target.checked));
	let label = document.createElement("label");
	label.htmlFor = "same-campus";
	label.appendChild(document.createTextNode(name));

	// create div
	let div = document.createElement("div");
	div.appendChild(checkbox);
	div.appendChild(label);

	return div;
}

async function setup_filters() {

	const {same_campus: same_campus_is_checked} = await chrome.storage.sync.get("same_campus");
	console.log(same_campus_is_checked);
	const same_campus = add_checkbox("Same campus", same_campus_is_checked, async (checked) => {
		await chrome.storage.sync.set({ same_campus: checked });
	});
	// .search-main-container
	const container = document.querySelector(".search-main-container");
	container.prepend(same_campus);

}

setup_filters();
