import {AuthEntry} from "./AuthEntry";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {environment} from "../environments/environment.development";
import {HttpClient} from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class AuthEntryService {
  private apiServerURL =environment.apiBaseUrl;
  constructor(private http: HttpClient) {}
  public login(authEntry: AuthEntry): Observable<AuthEntry> {
    return this.http.post<AuthEntry>(`${this.apiServerURL}/authentication`, authEntry);
  }

  public registration(authEntry: AuthEntry): Observable<AuthEntry>{
    console.log(authEntry.login);
    console.log(authEntry.password);
    return this.http.post<AuthEntry>(`${this.apiServerURL}/registration`, authEntry);
  }


}
