import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DatosinfoPage } from './datosinfo.page';

describe('DatosinfoPage', () => {
  let component: DatosinfoPage;
  let fixture: ComponentFixture<DatosinfoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatosinfoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DatosinfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
