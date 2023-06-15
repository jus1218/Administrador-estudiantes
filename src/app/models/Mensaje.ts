import { AlertButton, AlertController } from '@ionic/angular';
export interface Mensaje {
  alertController: AlertController;
  header: string;
  subHeader: string;
  buttons: (string | AlertButton)[];
}
