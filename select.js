
const createHTML = ({data = [],title,defId}) => {
	let text =  title ?? "Select Some Item";
	const items = data.map((item) => {
		let cls = ""
		if(item.id === defId){
			cls = "active"
			text = item.value
		}
		return `<li class="select_item ${cls}" data-id="${item.id}" data-type="item">${item.value}</li>`
	})
	return ` 
		<div class="select_input" data-type="input">
			<span data-type="title">${text}</span>
			<i class="fas fa-chevron-down" data-type="arrow"></i>
		</div>
			<div class="select_dropdown">
				<ul class="select_list">
					${items.join("")}
				</ul>
		</div>
	`
}

class  Select {
	constructor(selector,options){
		this.options = options
		this.$el = document.querySelector(selector);
		this.selId = options.defId

		this.#render();
		this.#setup();
	}
	#setup(){
		this.listener = this.listener.bind(this)
		this.$el.addEventListener("click",this.listener);
		this.$arrow = this.$el.querySelector(`[data-type="arrow"]`);
		this.$title = this.$el.querySelector(`[data-type="title"]`);


		document.addEventListener("click",(ev) => {
			if(ev.target.dataset.type !== "input"){
				this.close()
			}
		})
	}
	#render(){
		this.$el.classList.add("select");
		this.$el.innerHTML = createHTML(this.options);
	}


	// click
	listener(event){
		const dtype = event.target.dataset.type;
		if(dtype === "input"){
			this.toggle();
		} else if(dtype === "item"){
			const id = event.target.dataset.id;
			this.select(id)
		}
	}
	get isOpen(){
		return this.$el.classList.contains("open");
	}
	toggle(){
		this.isOpen ? this.close() : this.open();
	}

	get active(){
		return this.options.data.find( item => item.id === +this.selId);
	}

	select(id){
		this.selId = id;
		this.$el.querySelectorAll(`[data-type="item"]`).forEach( item => item.classList.remove("active"));
		this.$el.querySelector(`[data-id="${id}"]`).classList.add("active");
		this.$title.innerHTML = this.active.value
		console.log(this.active)
	}
	open(){
		this.$el.classList.add("open");
		this.$arrow.classList.remove("fa-chevron-down")
		this.$arrow.classList.add("fa-chevron-up")
	}
	close(){
		this.$el.classList.remove("open");
		this.$arrow.classList.add("fa-chevron-down")
		this.$arrow.classList.remove("fa-chevron-up")
	}
	destroy(){
		this.$el.removeEventListener("click", this.listener)
		this.$el.remove();
	}
}