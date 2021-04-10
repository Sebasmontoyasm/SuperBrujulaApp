import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tokens',
  templateUrl: './tokens.page.html',
  styleUrls: ['./tokens.page.scss'],
})
export class TokensPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  redirect(link: string){
      this.router.navigate(["tokens/"+link]);
  }
  
}
