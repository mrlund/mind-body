import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, tap } from "rxjs/operators";

@Injectable()
export class CreateJsService {

    private adobeAn: any;
    private createJs: any;

    constructor(httpClient: HttpClient){
        httpClient.get('/assets/createjs-2015.11.26.min.js', { observe: 'response', responseType: 'text' }).pipe(
           tap(x=>{
            console.log(x.body);
            let createScript = { createjs : {}, AdobeAn: {}};
            this.contextEval.call(createScript, x.body);
            // this.adobeAn = createScript.AdobeAn;
            // this.createJs = createScript.createjs;
           })
        ).subscribe();
    }
    contextEval(script){
        eval(script);
    }

    getAdobe(){
        return this.adobeAn;
    }
    getCreate(){
        return this.createJs;
    }
}