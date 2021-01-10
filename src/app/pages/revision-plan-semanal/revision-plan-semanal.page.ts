import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from "@ionic/angular";
import {ScreenOrientation} from "@ionic-native/screen-orientation/ngx";

@Component({
  selector: 'app-revision-plan-semanal',
  templateUrl: './revision-plan-semanal.page.html',
  styleUrls: ['./revision-plan-semanal.page.scss'],
})
export class RevisionPlanSemanalPage implements OnInit {

  @Input() planId;
  constructor(private modal:ModalController, private screenOrientation: ScreenOrientation) { }

  ngOnInit() {

  }
  ionViewWillEnter() {
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
  }
  ionViewWillLeave() {
    this.screenOrientation.unlock();
  }
  cancelar(){
    this.modal.dismiss();
  }


}
