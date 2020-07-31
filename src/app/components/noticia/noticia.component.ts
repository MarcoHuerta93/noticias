import { Component, OnInit, Input } from '@angular/core';
import { Article } from '../../interfaces/interfaces';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ActionSheetController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { IonicStorageModule } from '@ionic/storage';
import { DataLocalService } from '../../services/data-local.service';

@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent implements OnInit {

  @Input() noticia: Article;
  @Input() indice: number;
  constructor(
               private iab: InAppBrowser,
               private actionSheetController: ActionSheetController,
               private socialSharing: SocialSharing,
               private datalocalService: DataLocalService) { }

  ngOnInit() {}

  abrirNoticia(){
    console.log('Noticia', this.noticia.url);
    const browser = this.iab.create(this.noticia.url, '_system');
  }

  async lanzarMenu()
{
  const actionSheet = await this.actionSheetController.create({
    // header: 'Options',
    // cssClass: 'action-dark-head',
    buttons: 
    [
       {
      text: 'Compartir',
      icon: 'share-social-outline',
      cssClass: 'action-dark',
      handler: () => {
        console.log('Share clicked');
        this.socialSharing.share(
          this.noticia.title,
          this.noticia.source.name,
          '',
          this.noticia.url

        );
      }
    }, 
    {
      text: 'Favorito',
      icon: 'star-half-outline',
      cssClass: 'action-dark',
      handler: () => {
        console.log('Favorito');
        this.datalocalService.guardarNoticia(this.noticia);
      }
    },
     {
      text: 'Cancelar',
      icon: 'close-circle-outline',
      cssClass: 'action-dark',
      handler: () => {
        console.log('Cancel clicked');
        
      }
    }]
  });
  await actionSheet.present();
}
}
