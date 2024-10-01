class Main implements EventListenerObject {
    private nombre: string = "matias";
    private users: Array<Usuario> = new Array();

    constructor() {
        this.users.push(new Usuario('mramos', '123132'));
        
        let btn = this.recuperarElemento("btn");
        btn.addEventListener('click', this);
        let btnBuscar = this.recuperarElemento("btnBuscar");
        btnBuscar.addEventListener('click', this);
        let btnLogin = this.recuperarElemento("btnLogin");
        btnLogin.addEventListener('click', this);
        let btnPost = this.recuperarElemento("btnPost");
        btnPost.addEventListener('click', this);
    }
    handleEvent(object: Event): void {
        let idDelElemento = (<HTMLElement>object.target).id;
        if (idDelElemento == 'btn') {
            let divLogin = this.recuperarElemento("divLogin");
            divLogin.hidden = false;
        } else if (idDelElemento === 'btnBuscar') {
            console.log("Buscando!")
            this.buscarDevices();
        } else if (idDelElemento === 'btnLogin') {
            console.log("login")
            let iUser = this.recuperarElemento("userName");
            let iPass = this.recuperarElemento("userPass");
            let usuarioNombre: string = iUser.value;
            let usuarioPassword: string = iPass.value;
            
            if (usuarioNombre.length >= 4 && usuarioPassword.length >= 6) {
                console.log("Voy al servidor... ejecuto consulta")
                let usuario: Usuario = new Usuario(usuarioNombre, usuarioPassword);
                let checkbox = this.recuperarElemento("cbRecor");
                
                console.log(usuario, checkbox.checked);
                iUser.disabled = true;
                (<HTMLInputElement>object.target).disabled = true;
                let divLogin = this.recuperarElemento("divLogin");
                divLogin.hidden = true;
            } else {
                alert("El usuario o la contraseña son icorrectas");
            }
        } else if (idDelElemento == 'btnPost') {
            let xmlHttp = new XMLHttpRequest();
            xmlHttp.onreadystatechange = () => {
                if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                    console.log("se ejecuto el post", xmlHttp.responseText);
                }
            }
           
            xmlHttp.open("POST", "http://localhost:8000/usuario", true);
            
            xmlHttp.setRequestHeader("Content-Type", "application/json");
            xmlHttp.setRequestHeader("otracosa", "algo");
            

            let json = { name: 'mramos' };
            xmlHttp.send(JSON.stringify(json));


        } else {
            let input = <HTMLInputElement>object.target;
            alert(idDelElemento.substring(3) + ' - ' + input.checked);
            let prenderJson = { id: input.getAttribute("idBd"), status: input.checked }
            let xmlHttpPost = new XMLHttpRequest();
            
            xmlHttpPost.onreadystatechange = () => {
                if (xmlHttpPost.readyState === 4 && xmlHttpPost.status === 200) {
                    let json = JSON.parse(xmlHttpPost.responseText);
                    alert(json.id);
                }                
            }

            xmlHttpPost.open("POST", "http://localhost:8000/device", true);
            xmlHttpPost.setRequestHeader("Content-Type","application/json")
            xmlHttpPost.send(JSON.stringify(prenderJson));
        }
        
    }

    private buscarDevices(): void {
        let xmlHttp = new XMLHttpRequest();

        xmlHttp.onreadystatechange = () => {
            if (xmlHttp.readyState == 4) {
                if (xmlHttp.status == 200) {
                    let ul = this.recuperarElemento("list")
                    let listaDevices: string = '';
                   
                    let lista: Array<Device> = JSON.parse(xmlHttp.responseText);
                    
                    for (let item of lista) {
                        listaDevices += `
                        <li class="collection-item avatar">
                        <img src="./static/images/lightbulb.png" alt="" class="circle">
                        <span class="title">${item.name}</span>
                        <p>${item.description} 
                        </p>
                        <a href="#!" class="secondary-content">
                          <div class="switch">
                              <label>
                                Off`;
                        if (item.state) {
                            listaDevices +=`<input idBd="${item.id}" id="cb_${item.id}" type="checkbox" checked>`
                        } else {
                            listaDevices +=`<input idBd="${item.id}"  name="chk" id="cb_${item.id}" type="checkbox">`
                        }
                        listaDevices += `      
                                <span class="lever"></span>
                                On
                              </label>
                            </div>
                      </a>
                      </li>`
                     
                        
                    }
                    ul.innerHTML = listaDevices;
                
                    for (let item of lista) {
                        let cb = this.recuperarElemento("cb_" + item.id);
                        cb.addEventListener("click", this);
                    }
                } else {
                    alert("ERROR en la consulta");
                }
            }
            
        }

        xmlHttp.open("GET", "http://localhost:8000/devices", true);

        xmlHttp.send();

        
    }

    private recuperarElemento(id: string):HTMLInputElement {
        return <HTMLInputElement>document.getElementById(id);
    }
}
window.addEventListener('load', () => {
    
    let main: Main = new Main();
    
});

