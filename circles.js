var radius = {} || radius;
radius.inner = "100px";
radius.middle = "200px";
radius.outer = "250px";


var elems = {} || elems;
elems.inner = 10;
elems.middle = 10;
elems.outer = 10;


var center_of_concenteric_circles = {} || center_of_concenteric_circles;
center_of_concenteric_circles.X = 400;
center_of_concenteric_circles.Y = 300;											

//Total Width/Height = 500px; Thus we can fir these circles in a 510 by 510 box :D
var layers = {} || layers;
layers.inner = create_circle_locations(elems.inner,radius.inner,"i");
layers.middle = create_circle_locations(elems.middle,radius.middle,"m");
layers.outer = create_circle_locations(elems.outer,radius.outer,"o");

function create_circle_locations(no_of_elem,radius_of_circle)
	{
	var elements = new Array;
	var i = 0;
	var theta_step = 360/no_of_elem;
	var theta_step_radian = (2*Math.PI)/no_of_elem;
	//Angles in radians VERY Important
	while(i<no_of_elem)
		{
		elements.push(radius_of_circle,theta_step_radian*i,prefix)
		}
		return elements;
	}

function create_circle(rad,theta,prefix)
	{
	this.center_x = center_of_concentric_circles.x + rad*Math.cos(theta);
	this.center_y = center_of_concentric_circles.y - rad*Math.sin(theta);
	//-sign is because of DoM coordinate system
	this.radius = rad;
	//Width and height attribute of the divs 45px radius (Reasonable?)
	this.half_width = 45;
	this.half_height 45;
	this.build = 
	function(parent_element = document.body)
		{
		var div = document.createElement('div');
		div.setAttribute('id',prefix+theta);
		div.setAttribute('class',prefix+" circle_class");
		div.style.position = "absolute";
		div.style.top = (center_y - half_height)+"px";
		div.style.left = (center_x - half_width)+"px";
		parent_element.appendChild(div);	
		};
	}
