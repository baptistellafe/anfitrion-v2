import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor(private storage: Storage) {
    this.storage.create();
  }

  public async iniciarStorage() {
    await this.storage.create();
  }

  public async armazenarChave(key: string, value: any) {
    await this.storage?.set(key, value);
  }

  public async obterChave(key: string) {
    return await this.storage?.get(key);
  }

  public async removerChave(key: string) {
    await this.storage?.remove(key);
  }

  public async limparChaves() {
    await this.storage?.clear();
  }
}
