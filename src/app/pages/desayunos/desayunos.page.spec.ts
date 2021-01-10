import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DesayunosPage } from './desayunos.page';

describe('DesayunosPage', () => {
  let component: DesayunosPage;
  let fixture: ComponentFixture<DesayunosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesayunosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DesayunosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
