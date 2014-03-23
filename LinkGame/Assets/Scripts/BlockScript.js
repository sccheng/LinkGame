#pragma strict

var displayText = new GUIText();
var leftClick : boolean;
var rightClick : boolean;
var regularTxtr : UnityEngine.Texture;
var blinkingTxtr : UnityEngine.Texture;
var onClickTxtr : UnityEngine.Texture;
var blinked : boolean = false;
var blinkDuration = 17;
var delayBlink : int = blinkDuration;


function Start()
{
	displayText.text = "click: ";
	leftClick = false;
	rightClick = false;
	renderer.material.mainTexture = regularTxtr;
}

function Update()
{
	var hit : RaycastHit;
	var ray = Camera.main.ScreenPointToRay(Input.mousePosition);
	if(Input.GetMouseButtonDown(0) && Physics.Raycast(ray, hit, 100))
	{
		leftClick = !leftClick;
		Debug.Log("Leftclick is setting to true...?");
		displayText.text = "click: left";
		Debug.Log("click: " + displayText.text);
		renderer.material.mainTexture = onClickTxtr;
	}
	else if(Input.GetMouseButtonDown(1) && Physics.Raycast(ray, hit, 100))
	{
		rightClick = true;
		Debug.Log("Rightclick...?");
		displayText.text = "click: right";
		Debug.Log("click: " + displayText.text);
		renderer.material.mainTexture = regularTxtr;
	}
	else
	{
		if(!leftClick)
		{
			if(blinked)
			{
				delayBlink --;
			}
			if(blinked && delayBlink < 0)
			{
				renderer.material.mainTexture = regularTxtr;
				delayBlink = blinkDuration;
				blinked = false;
			}
			if(Random.Range(0, 100) % 60 == 0)
			{
				if(Random.Range(0, 100) % 2 == 0)
				{
					if(!blinked)
					{
						renderer.material.mainTexture = blinkingTxtr;
						blinked = true;
					}

				}	
			}
		}
	}
}