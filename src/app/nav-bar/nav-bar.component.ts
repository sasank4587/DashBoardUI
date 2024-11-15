
// import { DOCUMENT } from '@angular/common';
// import { HttpClient } from '@angular/common/http';
// import { Component, Inject, OnInit } from '@angular/core';
// import { AuthService } from '@auth0/auth0-angular';

// import {
//   MsalService,
//   MsalBroadcastService,
//   MSAL_GUARD_CONFIG,
//   MsalGuardConfiguration,
// } from '@azure/msal-angular';
// import {
//   AuthenticationResult,
//   InteractionStatus,
//   InteractionType,
//   PopupRequest,
//   RedirectRequest,
//   EventMessage,
//   EventType
// } from '@azure/msal-browser';
// import { Subject } from 'rxjs';
// import { filter, takeUntil } from 'rxjs/operators';

// @Component({
//   selector: 'app-nav-bar',
//   templateUrl: './nav-bar.component.html',
//   styleUrls: ['./nav-bar.component.css']
// })
// export class NavBarComponent implements OnInit {
//   loginDisplay = false;
//   isIframe = false;
//   displayname : string;
//   employeeType : string;


//    private readonly _destroying$ = new Subject<void>();

//   constructor(
//     @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
//     private authService: MsalService,
//     private httpClient: HttpClient,
//     private msalBroadcastService: MsalBroadcastService,
//   ) { }

//   ngOnInit(): void {
//     this.isIframe = window !== window.parent && !window.opener;
//     this.setLoginDisplay();
//     console.log("isLogin", this.loginDisplay);
//     this.authService.instance.enableAccountStorageEvents(); // Optional - This will enable ACCOUNT_ADDED and ACCOUNT_REMOVED events emitted when a user logs in or out of another tab or window

//     /**
//      * You can subscribe to MSAL events as shown below. For more info,
//      * visit: https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-angular/docs/v2-docs/events.md
//      */
//     this.msalBroadcastService.inProgress$
//       .pipe(
//         filter(
//           (status: InteractionStatus) => status === InteractionStatus.None
//         ),
//         takeUntil(this._destroying$)
//       )
//       .subscribe(() => {
//         this.setLoginDisplay();
//         this.checkAndSetActiveAccount();
//       });

//     this.msalBroadcastService.msalSubject$
//       .pipe(
//         filter(
//           (msg: EventMessage) => msg.eventType === EventType.LOGOUT_SUCCESS
//         ),
//         takeUntil(this._destroying$)
//       )
//       .subscribe((result: EventMessage) => {
//         this.setLoginDisplay();
//         this.checkAndSetActiveAccount();
//       });


//     this.msalBroadcastService.msalSubject$
//       .pipe(
//         filter(
//           (msg: EventMessage) => msg.eventType === EventType.LOGIN_SUCCESS
//         ),
//         takeUntil(this._destroying$)
//       )
//       .subscribe((result: EventMessage) => {
//         const payload = result.payload as AuthenticationResult;
//         this.authService.instance.setActiveAccount(payload.account);
//       });
//   }

//   setLoginDisplay() {
//     this.loginDisplay = this.authService.instance.getAllAccounts().length > 0;
//   }

//   // getEmployeeType() {
//   //   this.authService.acquireTokenSilent({ scopes: ["User.Read", "Directory.Read.All"] })
//   //     .subscribe({
//   //       next: (tokenResponse) => {
//   //         const headers = {
//   //           Authorization: `Bearer ${tokenResponse.accessToken}`,
//   //         };
  
//   //         this.httpClient.get(`https://graph.microsoft.com/v1.0/me`, { headers })
//   //           .subscribe((profile: any) => {
//   //             console.log("Profile", profile);
//   //             this.employeeType = profile.jobTitle;
//   //             console.log("Employee Type from Graph: ", this.employeeType);
//   //           });
//   //       },
//   //       error: (error) => {
//   //         if (error.name === 'InteractionRequiredAuthError') {
//   //           // Interactive login required
//   //           this.authService.acquireTokenPopup({ scopes: ["User.Read", "Directory.Read.All"] })
//   //             .subscribe({
//   //               next: (tokenResponse) => {
//   //                 const headers = {
//   //                   Authorization: `Bearer ${tokenResponse.accessToken}`,
//   //                 };
  
//   //                 this.httpClient.get(`https://graph.microsoft.com/v1.0/me`, { headers })
//   //                   .subscribe((profile: any) => {
//   //                     console.log("Profile", profile);
//   //                     this.employeeType = profile.jobTitle;
//   //                     console.log("Employee Type from Graph: ", this.employeeType);
//   //                   });
//   //               },
//   //               error: (popupError) => {
//   //                 console.error("Interactive consent failed", popupError);
//   //               }
//   //             });
//   //         } else {
//   //           console.error("Token acquisition failed", error);
//   //         }
//   //       }
//   //     });
//   // }

//   // getCustomAttributes(accessToken: string) {
//   //   const headers = new Headers({
//   //     'Authorization': `Bearer ${accessToken}`
//   //   });
  
//   //   fetch('https://graph.microsoft.com/v1.0/me', { headers })
//   //     .then(response => response.json())
//   //     .then(data => {
//   //       console.log('User attributes:', data);
//   //       // Handle custom attributes if available
//   //     })
//   //     .catch(error => {
//   //       console.error('Error fetching user attributes:', error);
//   //     });
//   // }
  
  
  

//   checkAndSetActiveAccount() {
//     /**
//      * If no active account set but there are accounts signed in, sets first account to active account
//      * To use active account set here, subscribe to inProgress$ first in your component
//      * Note: Basic usage demonstrated. Your app may require more complicated account selection logic
//      */
//     let activeAccount = this.authService.instance.getActiveAccount();

//     this.authService.acquireTokenSilent({
//       scopes: ['User.Read'] // Add other scopes if needed
//     }).subscribe({
//       next: (response) => {
//         const accessToken = response.accessToken;
//         // this.getCustomAttributes(accessToken);
//       },
//       error: (error) => {
//         console.error('Error acquiring token silently', error);
//       }
//     });
    

//     console.log("activeAccount", activeAccount);
//     if(activeAccount){
//       this.displayname = activeAccount.username;
//       // this.getEmployeeType()
//     }

//     if (!activeAccount && this.authService.instance.getAllAccounts().length > 0) {
//       let accounts = this.authService.instance.getAllAccounts();
//       // add your code for handling multiple accounts here
//       this.authService.instance.setActiveAccount(accounts[0]);
//     }
//   }

//   login() {
//     if (this.msalGuardConfig.interactionType === InteractionType.Popup) {
//       if (this.msalGuardConfig.authRequest) {
//         this.authService.loginPopup({
//           ...this.msalGuardConfig.authRequest,
//         } as PopupRequest)
//           .subscribe((response: AuthenticationResult) => {
//             this.authService.instance.setActiveAccount(response.account);
//           });
//       } else {
//         this.authService.loginPopup()
//           .subscribe((response: AuthenticationResult) => {
//             this.authService.instance.setActiveAccount(response.account);
//           });
//       }
//     } else {
//       if (this.msalGuardConfig.authRequest) {
//         this.authService.loginRedirect({
//           ...this.msalGuardConfig.authRequest,
//         } as RedirectRequest);
//       } else {
//         this.authService.loginRedirect();
//       }
//     }
//   }

//   logout() {

//     if (this.msalGuardConfig.interactionType === InteractionType.Popup) {
//       this.authService.logoutPopup({
//         account: this.authService.instance.getActiveAccount(),
//       });
//     } else {
//       this.authService.logoutRedirect({
//         account: this.authService.instance.getActiveAccount(),
//       });
//     }
//   }

//   // unsubscribe to events when component is destroyed
//   ngOnDestroy(): void {
//     this._destroying$.next(undefined);
//     this._destroying$.complete();
//   }

// }


import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import {
  MsalService,
  MsalBroadcastService,
  MSAL_GUARD_CONFIG,
  MsalGuardConfiguration,
} from '@azure/msal-angular';
import {
  AuthenticationResult,
  InteractionStatus,
  InteractionType,
  PopupRequest,
  RedirectRequest,
  EventMessage,
  EventType
} from '@azure/msal-browser';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit, OnDestroy {
  loginDisplay = false;
  isIframe = false;
  displayname: string;
  employeeType: string;

  private readonly _destroying$ = new Subject<void>();

  constructor(
    @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
    private authService: MsalService,
    private httpClient: HttpClient,
    private msalBroadcastService: MsalBroadcastService,
  ) { }

  ngOnInit(): void {
    this.isIframe = window !== window.parent && !window.opener;

    this.msalBroadcastService.inProgress$
      .pipe(
        filter((status: InteractionStatus) => status === InteractionStatus.None),
        takeUntil(this._destroying$)
      )
      .subscribe(() => {
        this.checkAndSetActiveAccount();
        this.setLoginDisplay();
      });

    this.msalBroadcastService.msalSubject$
      .pipe(
        filter((msg: EventMessage) => msg.eventType === EventType.LOGIN_SUCCESS),
        takeUntil(this._destroying$)
      )
      .subscribe((result: EventMessage) => {
        const payload = result.payload as AuthenticationResult;
        this.authService.instance.setActiveAccount(payload.account);
        this.checkAndSetActiveAccount();
      });
  }

  setLoginDisplay() {
    this.loginDisplay = this.authService.instance.getAllAccounts().length > 0;
  }

  checkAndSetActiveAccount() {
    let activeAccount = this.authService.instance.getActiveAccount();
    
    if (!activeAccount && this.authService.instance.getAllAccounts().length > 0) {
      const accounts = this.authService.instance.getAllAccounts();
      this.authService.instance.setActiveAccount(accounts[0]);
      activeAccount = accounts[0];
    }

    if (activeAccount) {
      this.displayname = activeAccount.username;
      // this.getEmployeeType();
    }
  }

  getEmployeeType() {
    this.authService.acquireTokenSilent({ scopes: ["User.Read", "Directory.Read.All"] })
      .subscribe({
        next: (tokenResponse) => {
          const headers = { Authorization: `Bearer ${tokenResponse.accessToken}` };
          this.httpClient.get(`https://graph.microsoft.com/v1.0/me`, { headers })
            .subscribe((profile: any) => {
              this.employeeType = profile.jobTitle;
            });
        },
        error: (error) => {
          if (error.name === 'InteractionRequiredAuthError') {
            this.authService.acquireTokenPopup({ scopes: ["User.Read", "Directory.Read.All"] })
              .subscribe({
                next: (tokenResponse) => {
                  const headers = { Authorization: `Bearer ${tokenResponse.accessToken}` };
                  this.httpClient.get(`https://graph.microsoft.com/v1.0/me`, { headers })
                    .subscribe((profile: any) => {
                      this.employeeType = profile.jobTitle;
                    });
                },
                error: (popupError) => {
                  console.error("Interactive consent failed", popupError);
                }
              });
          } else {
            console.error("Token acquisition failed", error);
          }
        }
      });
  }

  login() {
    const loginRequest = this.msalGuardConfig.authRequest || {};
    if (this.msalGuardConfig.interactionType === InteractionType.Popup) {
      this.authService.loginPopup(loginRequest as PopupRequest)
        .subscribe((response: AuthenticationResult) => {
          this.authService.instance.setActiveAccount(response.account);
          this.checkAndSetActiveAccount();
        });
    } else {
      this.authService.loginRedirect(loginRequest as RedirectRequest);
    }
  }

  logout() {
    const account = this.authService.instance.getActiveAccount();
    if (this.msalGuardConfig.interactionType === InteractionType.Popup) {
      this.authService.logoutPopup({ account });
    } else {
      this.authService.logoutRedirect({ account });
    }
  }

  ngOnDestroy(): void {
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }
}
