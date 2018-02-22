var DishDetailView = function(container, model,id) {



	this.container=container;

	//General State Function
	this.hide = function(){
		container.hide();
	}

	this.show = function(){
		container.show();
	}

	//Define variables
	var dishintro = container.find("#dishintro");
	var numberOfGuests = container.find(".numberOfGuests");
	var tableglobe = container.find("#tablelist");
	var backsearch= this.backsearch = container.find(".backsearch");
	this.currentDishId=1;  //这个id用this是因为会在addFunctionController调用改变

	//Construct View Function
	this.loadDishDetailView = function(id){


		var table = tableglobe;
		var dishId = id;

		dishintro.html("");
		tableglobe.html("");

		//1.Middle part: Picture and description

		var div = document.createElement('DIV');
		//dishname
		var dishname = document.createElement('h2');
		dishname.innerHTML = model.getDish(dishId).name;

		//dish picture
		var img = document.createElement("img");
		var src = "images/" + model.getDish(dishId).image;
		img.setAttribute("src", src);
		img.className = "img-responsive";
		img.style = "margin: 20px 0 20px 0";

		//dish description
		var description = document.createElement("p");
		description.innerHTML = model.getDish(dishId).description;

		div.appendChild(dishname);
		div.appendChild(img);
		div.appendChild(description);
		dishintro.append(div);


		//2.Right part: ingredient detail
		numberOfGuests.html(model.getNumberOfGuests());

		var getprice=0;

		//var table = container.find("#tablelist");


		for(var i = 0; i < model.getDish(dishId).ingredients.length; i++){

			//var table = container.find("#tablelist");
			var tablerow = document.createElement('tr');

			var quantity = document.createElement('td');
			quantity.innerHTML = (model.getDish(dishId).ingredients[i].quantity * model.getNumberOfGuests()) + " " + model.getDish(dishId).ingredients[i].unit;

			var name = document.createElement('td');
			name.innerHTML = model.getDish(dishId).ingredients[i].name;

			var sek = document.createElement('td');
			sek.innerHTML = "SEK";

			var price = document.createElement('td');
			price.innerHTML = model.getDish(dishId).ingredients[i].price * model.getDish(dishId).ingredients[i].quantity * model.getNumberOfGuests();

			//tablediv.appendChild(tablerow);
			tablerow.appendChild(quantity);
			tablerow.appendChild(name);
			tablerow.appendChild(sek);
			tablerow.appendChild(price);

			// add price every loop
			getprice=getprice+model.getDish(dishId).ingredients[i].price * model.getDish(dishId).ingredients[i].quantity * model.getNumberOfGuests();
			table.append(tablerow);
		}



		var tablerow = document.createElement('tr');

		var td1 = document.createElement("td");
		var td2 = document.createElement("td");


		var addmenubutton = document.createElement("button");
		addmenubutton.className = "btn btn-default addButton";
		addmenubutton.innerHTML = "Add to menu";
		addmenubutton.setAttribute("id", dishId);

		var td3 = document.createElement("td");
		var td4 = document.createElement("td");
		td3.innerHTML = "SEK";
		td4.innerHTML = getprice;

		//tablediv.appendChild(tablerow);
		tablerow.appendChild(td1);
		td1.appendChild(addmenubutton);
		tablerow.appendChild(td2);
		tablerow.appendChild(td3);
		tablerow.appendChild(td4);
		table.append(tablerow);
	}
	//End loadDishDetailView function

	this.update = function() {
		this.loadDishDetailView(this.currentDishId);
	}

	model.addObserver(this);

	this.loadDishDetailView(this.currentDishId);

}
