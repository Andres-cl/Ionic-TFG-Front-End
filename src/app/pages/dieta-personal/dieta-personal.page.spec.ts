import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DietaPersonalPage } from './dieta-personal.page';

describe('DietaPersonalPage', () => {
  let component: DietaPersonalPage;
  let fixture: ComponentFixture<DietaPersonalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DietaPersonalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DietaPersonalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
