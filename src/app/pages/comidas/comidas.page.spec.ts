import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ComidasPage } from './comidas.page';

describe('ComidasPage', () => {
  let component: ComidasPage;
  let fixture: ComponentFixture<ComidasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComidasPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ComidasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
