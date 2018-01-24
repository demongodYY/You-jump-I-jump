	var width;
	var x=0;
	var roleY = 300;
	var power = 0;
	var pillarsArray  = [0, 200,400,550,800,1150];
	document.onkeydown=keydown;
	document.onkeyup=keyup;

	function deal_right(type)
	{
		if (type=="set")
		{
			power++;	
		} 
		else{
			right_move(power);
			power = 0;
		}
	}
	function right_move(powerLocal)
	{	
		var times = 0;
		var interval = setInterval(() => {
			if( x < width -100){
				x += 20;
			}
			document.getElementById("tank").style.left=x + "px";
			
			if (times >= powerLocal) {
				console.log(x);
				dropDown();
				clearInterval(interval);
			}
			times++;
		},20)
	}
	function keydown(e)//e是火狐下的隐藏对象，相当于IE下的event
	{
		var ev=e || window.event;//兼容火狐和IE,
		//使用 || 运算符的好处是，当e可用时，ev=e,既火狐浏览器下，
		//非火狐浏览器时e为undefined，ev=window.event，既IE和webkit浏览器
		if(ev.keyCode==39 || ev.keyCode==68)
		{
			deal_right("set");
		}
	}
	function keyup(e)
	{
		var ev=e || window.event;
		if(ev.keyCode==39 || ev.keyCode==68)
		{
			deal_right("clr");
		}
	}
	function setPillar() {
		
		var border = document.getElementById("border");
		pillarsArray.forEach(element => {
			var pillar = document.createElement('div');
			pillar.className = "pillar"
			border.appendChild(pillar);
			pillar.style.left = element + "px";
		});
	}

	function dropDown() {
		var isDrop  = true;
		for(var i = 0; i<pillarsArray.length; i++) {
			if((x+50)>pillarsArray[i] && (x+10)<(pillarsArray[i]+80)){
				isDrop = false;
			}
		}
		if (isDrop === true){
			var interval = setInterval(() => {
				roleY -= 20;
				document.getElementById("tank").style.bottom= roleY + "px";
				if (roleY < -80) {
					alert("game over!");
					clearInterval(interval);
					location.reload();
				}
			},20)
		}
	}

	window.onload=function()
	{
		width = document.getElementById('border').offsetWidth;
		setPillar();
	}