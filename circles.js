/*


Ok, Most of the shit is done. Now the momentum thing is a pain. Drag drop of jQuery is failing :p
We need to write out own. Using CSS3 for the current "animation" Ping when in doubt. I didn't document. Too busy writing this :/

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
				var topush = new create_circle(radius_of_circle,theta_step_radian*i,prefix, i);
				elements.push(topush);
				i++;
				}
				return elements;
			}

		function create_circle(rad,theta,prefix,i)
			{
			console.log(prefix);
			this.center_x = center_of_concentric_circles.x + rad*Math.cos(theta);
			this.center_y = center_of_concentric_circles.y - rad*Math.sin(theta);
			//-sign is because of DoM coordinate system
			this.radius = rad;
			this.prefix = prefix;
			this.theta = theta;
			this.id = prefix+i;

			//Width and height attribute of the divs 45px radius (Reasonable?)
			this.half_width = 40;
			this.half_height = 40;
			this.left = this.center_x - this.half_width;
			this.top = this.center_y - this.half_height;
			this.momentum = function(obj,x,y,t)
				{
				x = x || 10;
				y = y || 10;
				t = t || .2;
					var V = {
					x : x/t,
					y : y/t
					};
					var fric = .1;
					var gravity = 9.8;
					//s = ut + 1/2at^2 :P
					//V^2 = U^2 + 2as :P
					//Sx = V.x^2/2*fric*9.8
					var S = 
					{
					x: ((V.x)^2)/(2*fric*gravity),
					y: ((V.y)^2)/(2*fric*gravity),
					};
					
					
					var initx = parseInt(obj.style.left);
					var inity = parseInt(obj.style.top);
					
					obj.style.top = inity + S.y + "px";//(center_of_concentric_circles.y - this.half_height)+"px";
					
					obj.style.left = initx + S.x + "px";//(center_of_concentric_circles.x - this.half_width)+"px";
				}
			this.build = function(parent_element)
				{
				parent_element = parent_element || document.body;//typeof parent_element !== undefined ? parent_element : document.body;
				var div = document.createElement('div');
				div.setAttribute('id',this.id);
				div.setAttribute('class',(prefix+" circle_class"));
				div.style.width = this.half_width*2+"px";
				div.style.height = this.half_height*2+"px";
				div.style.position = "absolute";
				div.style.top = (this.top)+"px";
				div.style.left = (this.left)+"px";
				parent_element.appendChild(div);//parent_element.appendChild(div);	
				
				/*
				This part is slighta complicated
				var obj = this;
				this makes me refer to the this of the _object_, *NOT* the DoM div
				*/
				
				var obj = this;
				
				/*
				
				In the event listener case, the this is referred to the div DoM this. Therefore I add the argument this to the function. We're basically 					passing the div to the function. Makes our manipulation N peaceful. I have basically made 2 objects behave similarly. give the div properties
				to a JS object and using the functions in there, to the DoM object. both eseentially behaving like clones :P using a this inside the function will result in the JS object being called not the DoM. Scope fucks :P
				
				
				HA! Scope pain pack :D It is there, but I have added methods to object and div :D therefore, we have to define the fumctions based on scope :/ Will have to decide on better approach.
				
				*/ 
				
				div.addEventListener('click',function(){
				this.set_momentum();
				}
				
				,false);
				
				/*
				I made the Div an object with new methods. We can sense drag drop using jQuery figure out time difference and x and y val differences and set momentum The arguments are self explanatory
				*/
				this.coords = new Array;
				this.time = new Array;
				div.set_momentum = function(difx,dify,tim){obj.momentum(this,difx,dify,tim)};
				div.reset = function(){obj.reset(this)};
				
				};
			this.center = function(obj)
				{
					//document.getElementById(this.id)
					obj.style.top = (center_of_concentric_circles.y - this.half_height)+"px";
					//document.getElementById(this.id)
					obj.style.left = (center_of_concentric_circles.x - this.half_width)+"px";
				};
			this.reset = function(obj)
				{
					obj.style.top = (this.top)+"px";
					obj.style.left = (this.left)+"px";
				};
			//console.log(this.center_x);
			}

	
		function build_elements()
			{
				var i = 0;
				console.log("building started");
				for(;i<layers.inner.length;i++)
					{
						layers.inner[i].build();
				/*
				
				jQuery Drag
				Failing
				
				$(layers.inner[i].id).draggable({
				start:function(e,ui)
				{
				console.log("Drag Start");
				this.time[0] = new Date();
				this.coords[0] = parseInt(this.style.top,10);
				this.coords[1] = parseInt(this.style.left,10);
				
				},
				stop:function(e,ui)
				{
				this.time[1] = new Date();
				this.coords[2] = parseInt(this.style.top,10);
				this.coords[3] = parseInt(this.style.left,10);
				difx = this.coords[2]-this.coords[0];
				dify = this.coords[3]-this.coords[1];
				tim = this.time[1]-this.time[0];
				this.set_momentum(difx,dify,tim);
				},
							
				});*/
				
					}
				for(i = 0;i<layers.middle.length;i++)
					{
						layers.middle[i].build();
					}
				for(i = 0;i<layers.outer.length;i++)
					{
						layers.outer[i].build();
					}
				window.setTimeout(function(){document.getElementById('o1').set_momentum(1,1,1);},700);
				window.setTimeout(function(){document.getElementById('o1').reset();},2100);
						
			}
		
	}
	build_body();

}
