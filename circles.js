/*


READ README BEFORE PROCEEDING

*/
window.onload = function(){
//This I am using to load into DOM. Waiting for Body to load.
function build_body()
	{
		var radius = {};// || radius;
		radius.inner = 100;
		radius.middle = 200;
		radius.outer = 320;


		var elems = {};// || elems;
		elems.inner = 6;
		elems.middle = 8;
		elems.outer = 5;


		var center_of_concentric_circles = {};// || center_of_concenteric_circles;
		center_of_concentric_circles.x = 400;
		center_of_concentric_circles.y = 300;											

		//Total Width/Height = 500px; Thus we can fir these circles in a 510 by 510 box :D
		var layers = {}; //|| layers;
		console.log("Came till creating layers");

		layers.inner = create_circle_locations(elems.inner,radius.inner,"i");
		console.log(layers.inner);

		layers.middle = create_circle_locations(elems.middle,radius.middle,"m");
		console.log(layers.middle);

		layers.outer = create_circle_locations(elems.outer,radius.outer,"o");
		console.log(layers.outer);


		build_elements();


		function create_circle_locations(no_of_elem,radius_of_circle,prefix)
			{
			var elements = new Array;
			var i = 0;
			var theta_step = 360/no_of_elem;
			var theta_step_radian = (2*Math.PI)/no_of_elem;
			//Angles in radians VERY Important
			while(i<no_of_elem)
				{
				var topush = new create_circle(radius_of_circle,theta_step_radian*i,prefix);
				elements.push(topush);
				i++;
				}
				return elements;
			}

		function create_circle(rad,theta,prefix)
			{
			console.log(prefix);
			this.center_x = center_of_concentric_circles.x + rad*Math.cos(theta);
			this.center_y = center_of_concentric_circles.y - rad*Math.sin(theta);
			//-sign is because of DoM coordinate system
			this.radius = rad;
			//Width and height attribute of the divs 45px radius (Reasonable?)
			this.half_width = 40;
			this.half_height = 40;
			this.build = function(parent_element)
				{
				parent_element = parent_element || document.body;//typeof parent_element !== undefined ? parent_element : document.body;
				var div = document.createElement('div');
				div.setAttribute('id',(prefix+theta));
				div.setAttribute('class',(prefix+" circle_class"));
				div.style.width = this.half_width*2+"px";
				div.style.height = this.half_height*2+"px";
				div.style.position = "absolute";
				div.style.top = (this.center_y - this.half_height)+"px";
				div.style.left = (this.center_x - this.half_width)+"px";
				document.body.appendChild(div);//parent_element.appendChild(div);	
				};
			//console.log(this.center_x);
			}


		/*create_circle.prototype.build = function(parent_element)
				{
				parent_element = parent_element || document.body;//typeof parent_element !== undefined ? parent_element : document.body;
				var div = document.createElement('div');
				div.setAttribute('id',(prefix+theta));
				div.setAttribute('class',(prefix+" circle_class"));
				div.style.position = "absolute";
				div.style.top = (center_y - half_height)+"px";
				div.style.left = (center_x - half_width)+"px";
				document.body.appendChild(div);//parent_element.appendChild(div);	
				};
		*/	
		function build_elements()
			{
				var i = 0;
				console.log("building started");
				for(;i<layers.inner.length;i++)
					{
						layers.inner[i].build();
					}
				for(i = 0;i<layers.middle.length;i++)
					{
						layers.middle[i].build();
					}
				for(i = 0;i<layers.outer.length;i++)
					{
						layers.outer[i].build();
					}
			}
	}
	build_body();
}
