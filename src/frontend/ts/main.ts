class Main implements EventListenerObject {
    private nombre: string = "matias";
    private users: Array<Usuario> = new Array();

    constructor() {

        this.users.push(new Usuario('mramos', '123132'));
        
        let btn = this.recuperarElemento("btn");
        btn.addEventListener('click', this);
        let btnBuscar = this.recuperarElemento("btnBuscar");
        btnBuscar.addEventListener('click', this);
    }
    handleEvent(object: Event): void {
        let idDelElemento = (<HTMLElement>object.target).id;
        if (idDelElemento == 'btn') {
            let persona = { "nombre": "Matias", "edad": 35 };

    
            alert(persona);
            let lista = JSON.stringify([persona, persona, persona]);
            
            let listaObjetos = JSON.parse(lista);
            for (let i of listaObjetos) {
                
            }
        } else if (idDelElemento == 'btnBuscar') {
            console.log("Buscando!")
            this.buscarDevices();
        }
        
    }

    private buscarDevices(): void {
        let xmlHttp = new XMLHttpRequest();

        xmlHttp.onreadystatechange = () => {
            if (xmlHttp.readyState == 4) {
                if (xmlHttp.status == 200) {
                    let div = this.recuperarElemento("list")
                    let listaDevices: string = '';
                   
                    let lista: Array<Device> = JSON.parse(xmlHttp.responseText);
                    for (let item of lista) {
                        listaDevices += "<h4>"+item.name + "</h4> - " + item.description + " prendido=" + item.state;
                        listaDevices += "<br>"
                        
                    }
                    div.innerHTML = listaDevices;
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

