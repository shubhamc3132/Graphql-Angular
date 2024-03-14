import { ComponentFixture, TestBed, async, fakeAsync, tick } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { DataService } from 'app/service/dataserives.service';
import { of, throwError } from 'rxjs';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let dataServiceSpy: jasmine.SpyObj<DataService>;

  beforeEach(async(() => {
    dataServiceSpy = jasmine.createSpyObj('DataService', ['getData']);

    TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      providers: [{ provide: DataService, useValue: dataServiceSpy }],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call getData() during initialization', fakeAsync(() => {
    // Arrange
    dataServiceSpy.getData.and.returnValue(of([]));

    // Act
    fixture.detectChanges();
    tick(); // simulate the passage of time until all pending asynchronous activities finish

    // Assert
    expect(dataServiceSpy.getData).toHaveBeenCalled();
  }));

  it('should set data when getData() is successful', fakeAsync(() => {
    // Arrange
    const mockData = [{/* your mock data here */}];
    dataServiceSpy.getData.and.returnValue(of(mockData));

    // Act
    fixture.detectChanges();
    tick();

    // Assert
    expect(component.data).toEqual(mockData);
  }));
  it('should handle API failure', fakeAsync(() => {
    dataServiceSpy.getData.and.returnValue(throwError('API Error'));
    fixture.detectChanges();
    tick();
    expect(component.data).toEqual([]); 
  }));
  afterEach(() => {
    TestBed.resetTestingModule();
  });
});
