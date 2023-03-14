import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {HitEntry} from "./HitEntry";
import {environment} from "../environments/environment.development";
import {AuthEntry} from "./AuthEntry";

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

  public clearAll(authEntry: AuthEntry): Observable<void> {
    return this.http.post<void>(`${this.apiServerURL}/hits/clear`,authEntry);
  }

  public logout(authEntry: AuthEntry): Observable<void> {
    return this.http.post<void>(`${this.apiServerURL}/logout`,authEntry);
  }
}
