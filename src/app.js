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
	parentDiv.append(img);
	parentDiv.append(n);
	parentDiv.append(f);
	parentDiv.append(c);
};
document.addEventListener('DOMContentLoaded', () => {
	d3.csv('/src/stats.csv', data => {
		createTeamInfo(data[2], 'team-a');
		createTeamInfo(data[10], 'team-b');
		
		createScoreBoard(data[2], '.team-a-stat')
		createScoreBoard(data[10], '.team-b-stat');

	});
	//****** */
});
