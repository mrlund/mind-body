import { Injectable } from "@angular/core";
import * as signalR from '@aspnet/signalr';
import { Subject } from "rxjs";

@Injectable()
export class SignalRService {

    public signalRConn: any;

    isOpen: boolean;

    constructor() {
        console.log("Starting signalR");
        this.signalRConn = new signalR.HubConnectionBuilder()
            .withUrl("https://localhost:44399/hubs/girls", { accessTokenFactory: () => this.getToken()})
            .build();

        this.signalRConn.on("SendMessage", (user, data) => {
            let payload = JSON.parse(data);
            console.log("Server said ", user, payload);
        });
        this.signalRConn.onclose(x => {
            console.log("Closed: ", x);
            this.isOpen = false;
        });

        if (this.getToken()){
            this.signalRConn.start()
                .then(() => this.isOpen = true);
        }
        
    }
    callSignalR(hub: string, data: any){
        //console.log("Service calling " + hub + " with  ", data);
        if (!this.getToken()){
            console.log("Cannot connect to signalR. Not logged in");
            return;
        }
        if (!this.isOpen){
            this.signalRConn.start()
                .then(() => {
                    this.isOpen = true;
                    this.signalRConn.invoke(hub, JSON.stringify(data));
                });
        } else {

            this.signalRConn.invoke(hub, JSON.stringify(data));
        }
    }
    getToken(): string {
        let tokenStr = window.localStorage["currentUser"];
        if (tokenStr) {
            let token = JSON.parse(tokenStr);
            token = JSON.parse(token);
            if (new Date(token["Expiration"]).getTime() > new Date().getTime()) {
                //console.log("returned token", token.Token);
                return token.Token;
            }
        }
        console.log("No token");
        return null;
    }

}
