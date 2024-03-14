import { TestBed } from '@angular/core/testing';
import { gql } from 'apollo-angular';
import { ApolloTestingController, ApolloTestingModule, TestOperation } from 'apollo-angular/testing';
import { PersonQuery } from 'app/enum/person-query.rnum';
import { DataService } from './dataserives.service';

describe('DataService', () => {
  let service: DataService;
  let apolloTestingController: ApolloTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ApolloTestingModule],
      providers: [DataService]
    });
    service = TestBed.inject(DataService);
    apolloTestingController = TestBed.inject(ApolloTestingController);
  });

  afterEach(() => {
    apolloTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return data from Apollo query', (done: DoneFn) => {
    const mockData = {
      data: {
        allPeople: {
          people: [
            { id: 1, name: 'John' },
            { id: 2, name: 'Jane' }
          ]
        }
      }
    };

    service.getData().subscribe(data => {
      expect(data).toEqual(mockData.data.allPeople.people);
      done();
    });

    const op = apolloTestingController.expectOne(gql(PersonQuery.GET_PERSON));

    op.flush(mockData);

    expect(op.operation.variables).toEqual({});
  });

  // it('should handle errors from Apollo query', (done: DoneFn) => {
  //   const errorMessage = 'Error fetching data';

  //   service.getData().subscribe({
  //     error: (err: any) => {
  //       expect(err.message).toBe(errorMessage);
  //       done();
  //     }
  //   });

  //   const op: TestOperation<any> = apolloTestingController.expectOne(gql(PersonQuery.GET_PERSON));

  //   op.mockError(new Error(errorMessage));
  // });
});
