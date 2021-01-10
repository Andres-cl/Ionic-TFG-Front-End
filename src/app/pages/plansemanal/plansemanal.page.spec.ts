import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PlansemanalPage } from './plansemanal.page';

describe('PlansemanalPage', () => {
  let component: PlansemanalPage;
  let fixture: ComponentFixture<PlansemanalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlansemanalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PlansemanalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
