const createOption = (data, team) => {
	const teamSelect = document.getElementById(team);
	data.forEach(t => {
		let option = document.createElement('option');
		option.text = t.team_name;
		teamSelect.add(option);
	});
};

const createTeamInfo = (d, el) => {
	const parentDiv = document.getElementsByClassName(el)[0];
	const img = document.createElement('img');
	const n = document.createElement('div');
	n.setAttribute('class', 'info-name');
	n.innerHTML = `${d.team_name}`;
	const f = document.createElement('div');
	f.setAttribute('class', 'info-f');
	f.innerHTML = ` ${d.season}`;

	const c = document.createElement('div');
	c.setAttribute('class', 'logo-info');
	c.innerHTML = `${d.country}`;

	img.setAttribute('class', 'logo-img');
	img.src = d.team_logo;
	parentDiv.prepend(n);
	parentDiv.prepend(f);
	parentDiv.prepend(c);
	parentDiv.prepend(img);
};

document.addEventListener('DOMContentLoaded', () => {
	d3.csv('/src/stats.csv', data => {
		createTeamInfo(data[0], 'team-a');
		createTeamInfo(data[1], 'team-b');
		createOption(data, 'team-select-a');
		createOption(data, 'team-select-b');
		createScoreBoard(data[0], '.team-a-stat');
		createScoreBoard(data[1], '.team-b-stat');
	});
	//****** */
});
