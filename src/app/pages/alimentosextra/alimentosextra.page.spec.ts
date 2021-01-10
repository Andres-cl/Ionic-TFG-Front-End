import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AlimentosextraPage } from './alimentosextra.page';

describe('AlimentosextraPage', () => {
  let component: AlimentosextraPage;
  let fixture: ComponentFixture<AlimentosextraPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlimentosextraPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AlimentosextraPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
