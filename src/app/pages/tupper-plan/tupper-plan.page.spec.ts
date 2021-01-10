import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TupperPlanPage } from './tupper-plan.page';

describe('TupperPlanPage', () => {
  let component: TupperPlanPage;
  let fixture: ComponentFixture<TupperPlanPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TupperPlanPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TupperPlanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
