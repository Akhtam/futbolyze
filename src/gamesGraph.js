const sumTotal = (teamData) => {
	let totalScored = 0;
	let totalConceded = 0;
	teamData.forEach(d =>
		d.type === 'scored'
			? (totalScored += +d.amount)
			: (totalConceded += +d.amount)
	);
	return {
		totalScored,
		totalConceded
	}
}

const createScoreBoard = (team, div) => {

		const parentDiv = document.getElementsByClassName(div.slice(1))[0];
		const scoreboard = document.getElementsByClassName('scoreboard')[0];
		if (parentDiv.firstChild) parentDiv.firstChild.remove();


	let data = [
		{ amount: team.goals_scored_min_0_to_10, time: 10, type: 'scored' },
		{ amount: team.goals_scored_min_11_to_20, time: 20, type: 'scored' },
		{ amount: team.goals_scored_min_21_to_30, time: 30, type: 'scored' },
		{ amount: team.goals_scored_min_31_to_40, time: 40, type: 'scored' },
		{ amount: team.goals_scored_min_41_to_50, time: 50, type: 'scored' },
		{ amount: team.goals_scored_min_51_to_60, time: 60, type: 'scored' },
		{ amount: team.goals_scored_min_61_to_70, time: 70, type: 'scored' },
		{ amount: team.goals_scored_min_71_to_80, time: 80, type: 'scored' },
		{ amount: team.goals_scored_min_81_to_90, time: 90, type: 'scored' },
		{ amount: team.goals_conceded_min_0_to_10, time: 10, type: 'conceded' },
		{ amount: team.goals_conceded_min_11_to_20, time: 20, type: 'conceded' },
		{ amount: team.goals_conceded_min_21_to_30, time: 30, type: 'conceded' },
		{ amount: team.goals_conceded_min_31_to_40, time: 40, type: 'conceded' },
		{ amount: team.goals_conceded_min_41_to_50, time: 50, type: 'conceded' },
		{ amount: team.goals_conceded_min_51_to_60, time: 60, type: 'conceded' },
		{ amount: team.goals_conceded_min_61_to_70, time: 70, type: 'conceded' },
		{ amount: team.goals_conceded_min_71_to_80, time: 80, type: 'conceded' },
		{ amount: team.goals_conceded_min_81_to_90, time: 90, type: 'conceded' }
    ];

	const {totalScored, totalConceded}  = sumTotal(data);

	

	// set the dimensions and margins of the graph
	let margin = { top: 10, right: 30, bottom: 50, left: 60 },
		width = 460 - margin.left - margin.right,
		height = 400 - margin.top - margin.bottom;

	// append the svg object to the body of the page
	let svg = d3
		.select(div)
		.append('svg')
		.attr('width', width + margin.left + margin.right)
		.attr('height', height + margin.top + margin.bottom)
		.append('g')
		.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

	//Read the data

	// Add X axis
	let x = d3
		.scaleLinear()
		.domain([0, 90])
		.range([0, width]);
	svg.append('g')
		.attr('transform', 'translate(0,' + height + ')')
        .call(d3.axisBottom(x));
    svg.append('text')
        .attr('text-anchor', 'end')
        .attr('x', width)
        .attr('y', height + margin.top + 30)
        .text('MINUTES')
        .style('fill', 'white');
    svg.append('text')
        .attr('text-anchor', 'end')
        .attr('transform', 'rotate(-90)')
        .attr('y', -margin.left + 25)
        .attr('x', -margin.top)
        .text('GOALS')
        .style('fill', 'white');

	// Add Y axis
	let y = d3
		.scaleLinear()
		.domain([0, 17])
		.range([height, 0]);
	svg.append('g').call(d3.axisLeft(y));

	svg.selectAll('.tick line').attr('stroke', 'white');
	svg.selectAll('.tick text')
		.attr('stroke', 'white')
		.style('font-size', 12)
		.style('font-weight', 100);



	// Color scale: give me a type of goal, I return a color
	let color = d3
		.scaleOrdinal()
		.domain(['scored', 'conceded'])
		.range(['#008E9B', '#FF6F91']);

	// Highlight the amoun that is hovered
	let highlight = function(d, action) {
		type = d.type;
		let size = action === 'mouseover' ? 8 : 11;

		d3.selectAll('.dot')
			.transition()
			.duration(250)
			.style('fill', 'lighgrey')
			.attr('r', size);

		d3.selectAll('.' + type)
			.transition()
			.duration(250)
			.style('fill', color(type))
			.attr('r', 11);
	};


	//LINE
    svg.append('path')
		.datum(data.slice(0, 9))
		.attr('fill', 'none')
		.attr('stroke', '#DFE0DF')
		.attr('stroke-width', 2)
		.attr(
			'd',
			d3
				.line()
				.x(d => x(d.time))
				.y(d => (d.amount > 16 ? y(17) : y(d.amount)))
		);
	// LINE
    svg.append('path')
		.datum(data.slice(9))
		.attr('fill', 'none')
		.attr('stroke', '#DFE0DF')
		.attr('stroke-width', 2)
		.attr(
			'd',
			d3
				.line()
				.x(d => x(d.time))
				.y(d => y(d.amount))
		);


	let Scoreboard = d3
		.select('.scoreboard')
		.append('div')
		.style('opacity', 1)
		.attr('class', `tooltip`)
		.style('padding', '5px')
		.html(
			`<span class='scored'>Scored</span>: ${totalScored}
			<br />
			<span class='conceded'>Conceded</span>: ${totalConceded} 
			<br/> Minutes: Overall`
		);

			
	// Three function that change the tooltip when user hover / move / leave a cell
	let mouseover = function(d) {
		Scoreboard.style('opacity', 1);
	};
	let mousemove = function(d) {
		let mins = d.type == 'scored' ? 'scoredmin' : 'concmin'
		Scoreboard.html(
			` <span class='scored'>Scored</span>: ${
				d.type === 'scored' ? d.amount : totalScored
			} <br/> 
				<span class='conceded'>Conceded</span>: ${
					d.type === 'conceded' ? d.amount : totalConceded
				}
				<br />
				<span class=${mins}>Minutes: ${d.time - 10} - ${d.time} </span>
			`
		);
	};
	let mouseleave = function(d) {
		Scoreboard.html(
			`<span class='scored'>Scored</span>: ${totalScored} 
				<br/>
			<span class='conceded'>Conceded</span>: ${totalConceded} 
			<br/>
				Minutes: Overall`
		);
	};



	// Add dots
	svg.append('g')
		.selectAll('dot')
		.data(data)
		.enter()
		.append('circle')
		.attr('class', (d) => 'dot ' + d.type)
		.attr('cx', (d) => x(d.time))
		.attr('cy', (d) => d.amount > 16 ? y(17) : y(d.amount))
		.attr('r', 11)
		.style('fill', (d) => color(d.type))
		.on('mouseover', (d) => {
			mouseover(d)
			highlight(d, 'mouseover');
		})
		.on('mousemove', mousemove)
		.on('mouseleave',(d) => { 
			mouseleave(d)
			highlight(d,'mouseleave');
		})
};

//   let dataset = [
// 		{ name: 'Chrome', value: 21 },
// 		{ name: 'Safari', value: 7 },
// 		{ name: 'Others', value: 14 }
//   ];

//   let pie = d3.layout
// 		.pie()
// 		.value(function(d) {
// 			return d.value;
// 		})
// 		.sort(null)
// 		.padAngle(0.03);

//   let w = 110,
// 		h = 110;

//   let outerRadius = w / 2;
//   let innerRadius = 20;

//   let color = d3.scale.category10();

//   let arc = d3.svg
// 		.arc()
// 		.outerRadius(outerRadius)
// 		.innerRadius(innerRadius);

//   let svg = d3
// 		.select(team)
// 		.append('svg')
// 		.attr({
// 			width: w,
// 			height: h,
// 			class: 'shadow'
// 		})
// 		.append('g')
// 		.attr({
// 			transform: 'translate(' + w / 2 + ',' + h / 2 + ')'
// 		});
//   let path = svg
// 		.selectAll('path')
// 		.data(pie(dataset))
// 		.enter()
// 		.append('path')
// 		.attr({
// 			d: arc,
// 			fill: function(d, i) {
// 				return color(d.data.name);
// 			}
// 		});

//   path.transition()
// 		.duration(1200)
// 		.attrTween('d', function(d) {
// 			let interpolate = d3.interpolate({ startAngle: 0, endAngle: 0 }, d);
// 			return function(t) {
// 				return arc(interpolate(t));
// 			};
// 		});

//   let restOfTheData = function() {
// 		let text = svg
// 			.selectAll('text')
// 			.data(pie(dataset))
// 			.enter()
// 			.append('text')
// 			.transition()
// 			.duration(200)
// 			.attr('transform', function(d) {
// 				return 'translate(' + arc.centroid(d) + ')';
// 			})
// 			.attr('dy', '.4em')
// 			.attr('text-anchor', 'middle')
// 			.text(function(d) {
// 				return d.data.value;
// 			})
// 			.style({
// 				fill: '#fff',
// 				'font-size': '15px'
// 			});
//   };

//   setTimeout(restOfTheData, 1000);
