import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TuppersPage } from './tuppers.page';

describe('TuppersPage', () => {
  let component: TuppersPage;
  let fixture: ComponentFixture<TuppersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TuppersPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TuppersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
