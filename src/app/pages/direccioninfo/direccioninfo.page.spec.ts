import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DireccioninfoPage } from './direccioninfo.page';

describe('DireccioninfoPage', () => {
  let component: DireccioninfoPage;
  let fixture: ComponentFixture<DireccioninfoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DireccioninfoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DireccioninfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
