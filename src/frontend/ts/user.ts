class Usuario{
  private userName:string;
  private password: string;
  
  constructor(userName: string, password: string) {
    this.userName = userName;
    this.password = password;
  }
  public toString(): string{
    return "Username " + this.userName;
  }

}