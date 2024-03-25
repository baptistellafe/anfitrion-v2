import { Component, OnInit } from '@angular/core';
import { Cidade } from 'src/app/interfaces/Cidade';
import { AppConfigService } from 'src/app/services/app-config.service';

@Component({
  selector: 'anf-city-button',
  templateUrl: './city-button.component.html',
  styleUrls: ['./city-button.component.scss'],
})
export class CityButtonComponent  implements OnInit {

  public cities: Cidade[];
  public selectedCity: Cidade | undefined;
  public selectedCityValue: string | undefined;

  constructor(
    private appConfig : AppConfigService
  ) { }

  async ngOnInit() {
    this.cities = this.appConfig.obterCidades();
    this.definirCidade();
  }

  public definirCidade(e?: any): void {
    this.selectedCityValue = 'santos';

    if (e) {
      this.selectedCityValue = e.detail.value;
    }

    console.log(this.selectedCityValue);

    this.selectedCity = this.cities.find((city: Cidade) => city.value === this.selectedCityValue );

    console.log(this.selectedCity);
  }

}
