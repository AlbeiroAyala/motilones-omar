import { Injectable } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  constructor(private alertController: AlertController, private loadingCtrl: LoadingController) { }
  
  
  async alert(titulo: string, msg: string) {
    const alert = await this.alertController.create({
      header: titulo,  
      message: msg,
      buttons: ['Cerrar'],
      mode:'ios' 
    });

    await alert.present();
  }
  
  async showLoading( message: string) {
    const loading = await this.loadingCtrl.create({
      message ,
      mode:'ios'  
    });

    loading.present();
  }
  
 async  hideLoading(){
     await this.loadingCtrl.dismiss({});    
  }
  
  async alertOfOn(titulo: string, msg: string){
    const alert = await this.alertController.create({
      header: titulo,  
      message: msg,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {           
          },
        },
        {
          text: 'Confirmar',
          role: 'confirm',
          handler: () => {
          },
        },
      ],
      mode:'ios' 
    });
    await alert.present();    
    const res = await alert.onDidDismiss();    
    return res.role === 'confirm'? true: false;    
  }
  
  
}
