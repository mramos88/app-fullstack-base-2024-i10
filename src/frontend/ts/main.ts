class Main implements EventListenerObject {
    private nombre: string = "matias";
    private users: Array<Usuario> = new Array();

    constructor() {
        
        this.users.push(new Usuario('mramos', '123132'));
        let btn = this.recuperarElemento("btn");
        
        btn.addEventListener('click', this);
    }
    handleEvent(object: Event): void {
        alert(this.nombre);
    }
    private recuperarElemento(id: string):HTMLInputElement {
        return <HTMLInputElement>document.getElementById(id);
    }
}
window.addEventListener('load', () => {
    
    let main: Main = new Main();
    
});

