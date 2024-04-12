import { Component, Input, OnInit } from '@angular/core';
import { RedeSocial } from 'src/app/interfaces/RedeSocial';
import { AppConfigService } from 'src/app/services/app-config.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'anf-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent  implements OnInit {

  public redesSociais: RedeSocial[];

  @Input() darkMode: boolean = false;

  constructor(
    private appConfig : AppConfigService
  ) { }

  ngOnInit() {
    this.redesSociais = this.appConfig.obterRedesSociais()
  }

}
