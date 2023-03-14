import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {HitEntry} from "./HitEntry";
import {environment} from "../environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class HitEntryService{
  private apiServerURL =environment.apiBaseUrl;
  constructor(private http: HttpClient) {}

  public getHitEntry(login: string): Observable<HitEntry[]>{
    return this.http.get<HitEntry[]>(`${this.apiServerURL}/hits/${login}`);
  }

  public checkHitEntry(hitEntry: HitEntry): Observable<HitEntry>{
    return this.http.post<HitEntry>(`${this.apiServerURL}/hits/add`, hitEntry);
  }

  public clearAll(login: string): Observable<void> {
    return this.http.delete<void>(`${this.apiServerURL}/hits/clear/${login}`);
  }


}
