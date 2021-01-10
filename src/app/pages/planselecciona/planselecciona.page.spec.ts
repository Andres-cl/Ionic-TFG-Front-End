import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PlanseleccionaPage } from './planselecciona.page';

describe('PlanseleccionaPage', () => {
  let component: PlanseleccionaPage;
  let fixture: ComponentFixture<PlanseleccionaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanseleccionaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PlanseleccionaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
