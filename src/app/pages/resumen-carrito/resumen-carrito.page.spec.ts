import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ResumenCarritoPage } from './resumen-carrito.page';

describe('ResumenCarritoPage', () => {
  let component: ResumenCarritoPage;
  let fixture: ComponentFixture<ResumenCarritoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResumenCarritoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ResumenCarritoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
