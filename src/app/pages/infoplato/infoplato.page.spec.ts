import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InfoplatoPage } from './infoplato.page';

describe('InfoplatoPage', () => {
  let component: InfoplatoPage;
  let fixture: ComponentFixture<InfoplatoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoplatoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InfoplatoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
