import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {
  message:string='Sie sind nicht eingelogt. (pikachu/pikachu)';
  name:string;
  password:string;
  auth:AuthService

  constructor(private authService:AuthService,private router:Router) { }

  ngOnInit(): void {
    this.auth = this.authService;
  }

  setMessage(){
    if(this.authService.isLoggedIn){
         this.message = 'Sie sind eingelogt'
    }
    else{

      this.message = 'Username oder Passwort falsch'

    }

  }



  login(){
    this.message = 'Verbindungsversuch im Gange';
    this.authService.login(this.name,this.password).subscribe(
      isLoggedIn => {
        this.setMessage();
        if(isLoggedIn){
          this.router.navigate(['/pokemons'])
        }

        else{
          this.router.navigate(['/login'])
        }
        
      }
    )

  }

  logout(){

    this.authService.logout()
    this.message = ' Sie sind ausgelogt'

  }

}
