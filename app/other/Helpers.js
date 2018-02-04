export class Helpers {
  static get initialInitGroups () {
    return [
    	{
    		id: "group-start",
    		name: "start of new round",
    		init: Number.MAX_SAFE_INTEGER,
    		type: "nonChar",
    		charIds: ["new-round"],
    	},
    ];
  }
  
  static get initialCharacters () {
    return [
    	{
    		id: "new-round",
    		name: "start of new round",
    		hp: 1,
    		hpMax: 0,
    	},
    ];
  }
  
  static sortInitGroups (left, right) {
  	return right.init - left.init;
  }
  
  static indexOfMaxInit (initGroups) {
  	if (initGroups.length === 0) {
  		return -1;
  	}

  	var max = initGroups[0].init;
  	var maxIndex = 0;

  	for (var i = 1; i < initGroups.length; i++) {
  		if (initGroups[i].init > max) {
  			maxIndex = i;
  			max = initGroups[i].init;
  		}
  	}

  	return maxIndex;
  }
  
  // returns a new array with newInitGroup inserted into initGroupArray
  // initGroupArray should contain elements in init order, though the element with the
  //	largest init may not be at index 0.
  static insertInitGroup (newInitGroup, initGroupArray) {
  	var newInitGroupArray = initGroupArray.slice();
  	var indexMaxInit = this.indexOfMaxInit(newInitGroupArray);

  	// Has the initGroups at top of order (when it contains any elements)
  	var leftArray = newInitGroupArray.slice(0, indexMaxInit);
  	// Starts with the element with the highest init value
  	var rightArray = newInitGroupArray.slice(indexMaxInit, newInitGroupArray.length);

  	// Checking new init from top of init order (beginning of rightArray) going down
  	var inserted = false;
  	for (var i = 0; i < rightArray.length; i++) {
  		if (inserted === false && newInitGroup.init > rightArray[i].init) {
  			rightArray.splice(i, 0, newInitGroup);
  			inserted = true;
  		}
  	}

  	if (inserted === false) {
  		for (var i = 0; i < leftArray.length; i++) {
  			if (inserted === false && newInitGroup.init > leftArray[i].init) {
  				leftArray.splice(i, 0, newInitGroup);
  				inserted = true;
  			}
  		}
  		if (leftArray.length > 0 && inserted === false) {
  			leftArray.push(newInitGroup);
  			inserted = true;
  		}
  	}

  	if (inserted === false) {
  		rightArray.push(newInitGroup);
  	}

  	return leftArray.concat(rightArray);
  }
}