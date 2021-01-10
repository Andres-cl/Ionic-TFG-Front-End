import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RecuperaContrasenyaPage } from './recupera-contrasenya.page';

describe('RecuperaContrasenyaPage', () => {
  let component: RecuperaContrasenyaPage;
  let fixture: ComponentFixture<RecuperaContrasenyaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecuperaContrasenyaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RecuperaContrasenyaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
