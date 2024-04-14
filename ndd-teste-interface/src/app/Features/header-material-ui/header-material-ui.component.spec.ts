import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderMaterialUiComponent } from './header-material-ui.component';

describe('HeaderMaterialUiComponent', () => {
  let component: HeaderMaterialUiComponent;
  let fixture: ComponentFixture<HeaderMaterialUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderMaterialUiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeaderMaterialUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
