const createTeamInfo = (d, el) => {
	const parentDiv = document.getElementsByClassName(el)[0];
	if (parentDiv.children.length > 1) {
		let n = 3;
		while (n > 0) {
			parentDiv.firstChild.remove();
			n--;
		}
	}
	const img = document.createElement('img');
	const n = document.createElement('div');
	n.setAttribute('class', 'info-name');
	n.innerHTML = `${d.team_name}`;
	const f = document.createElement('div');
	f.setAttribute('class', 'info-f');
	f.innerHTML = ` ${d.season}`;


	img.setAttribute('class', 'logo-img');
	img.src = d.team_logo;
	parentDiv.prepend(f);
	parentDiv.prepend(n);
	parentDiv.prepend(img);
};

const createOption = (data, team) => {
	const teamSelect = document.getElementById(team);
	const fastTeamLook = {};
	data.forEach((t, i) => {
		fastTeamLook[t.team_name] = i;
		let option = document.createElement('option');
		option.text = t.team_name;
		option.setAttribute('value', t.team_name);
		if (team === 'team-select-b' && i === 2) {
			option.setAttribute('selected', 'selected');
			teamSelect.add(option);
		} else {
			teamSelect.add(option);
		}
	});
	let teamInfo = team[team.length - 1] === 'a' ? 'team-a' : 'team-b';
	let teamStat =
		team[team.length - 1] === 'a' ? '.team-a-stat' : '.team-b-stat';
	teamSelect.addEventListener('change', e => {
		const selecttedTeam = fastTeamLook[e.currentTarget.value];
		createTeamInfo(data[selecttedTeam], teamInfo);
		createScoreBoard(data[selecttedTeam], teamStat);
	});
};

document.addEventListener('DOMContentLoaded', () => {
	d3.csv('/src/stats.csv', data => {
		createTeamInfo(data[0], 'team-a');
		createTeamInfo(data[2], 'team-b');
		createOption(data, 'team-select-a');
		createOption(data, 'team-select-b');
		createScoreBoard(data[0], '.team-a-stat');
		createScoreBoard(data[2], '.team-b-stat');
	});
	//****** */
});
