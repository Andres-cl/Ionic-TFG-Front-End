import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DietaPersonalAlimentosPage } from './dieta-personal-alimentos.page';

describe('DietaPersonalAlimentosPage', () => {
  let component: DietaPersonalAlimentosPage;
  let fixture: ComponentFixture<DietaPersonalAlimentosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DietaPersonalAlimentosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DietaPersonalAlimentosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
