import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Allocation } from './allocation';

@Injectable({
  providedIn: 'root'
})
export class AllocationService {
  private url = 'http://localhost:5200';
  private allocation$: Subject<Allocation[]> = new Subject();
  
  constructor(private httpClient: HttpClient) { }
  
  private refreshAllocation() {
    this.httpClient.get<Allocation[]>(`${this.url}/allocations`)
      .subscribe(allocations => {
        this.allocation$.next(allocations);
      });
  }
  
  getAllocations(): Subject<Allocation[]> {
    this.refreshAllocation();
    return this.allocation$;
  }
  
  getAllocation(id: string): Observable<Allocation> {
    return this.httpClient.get<Allocation>(`${this.url}/allocations/${id}`);
  }
  
  createAllocation(allocation: Allocation): Observable<string> {
    return this.httpClient.post(`${this.url}/allocations`, allocation, { responseType: 'text' });
  }
  
  updateAllocation(id: string, allocation: Allocation): Observable<string> {
    return this.httpClient.put(`${this.url}/allocations/${id}`, allocation, { responseType: 'text' });
  }
  
  deleteAllocation(id: string): Observable<string> {
    return this.httpClient.delete(`${this.url}/allocations/${id}`, { responseType: 'text' });
  }
}
