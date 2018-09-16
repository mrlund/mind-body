import { ICourseContentProvider, ICourseModule, ICourse, IPageModel, IPageReference, IPage, CourseContentProvider } from '../interfaces/girls-interfaces';
import { Observable, of } from 'rxjs';
import { tap, switchMap, map, debounceTime } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";

@Injectable()
export class JsonContentProvider implements ICourseContentProvider {

    private toc: ICourse;

    getNextAndPrevPage(page: IPageReference): Observable<IPageModel> {
        if (this.toc) {
            let pages = this.toc.courseModules.find(x => x.id == page.courseModuleId || x.urlName == page.courseModuleUrlPart).sessions.find(x => x.id == page.sessionId || x.urlName == page.sessionUrlPart).pages;
            let totalPages = pages.length;
            let index = pages.findIndex(x => x.id == page.pageId || x.urlName == page.pageUrlPart);
            let model = { prevPage: this.safeGetIndex(pages, index - 1), page: this.safeGetIndex(pages, index), nextPage: this.safeGetIndex(pages, index + 1) };
            let path = this.getPathToPage(page);
            model.page.pageReference = { courseModuleUrlPart: path.urlName, sessionUrlPart: path.sessions[0].urlName, pageUrlPart: path.sessions[0].pages[0].urlName };
            model.page.totalPages = totalPages;
            return of(model);
        }
        //TODO: Prevent double fetch of ToC through switch/debounce or cache
        return this.getTableOfContent().pipe(switchMap(x => this.getNextAndPrevPage(page)));
    }

    private safeGetIndex(arr: Array<any>, index: number) {
        if (index > -1 && index < arr.length) {
            return arr[index];
        } else {
            return null;
        }
    }

    private getPathToPage(page: IPageReference): ICourseModule {
        if (this.toc) {

            //let root = Object.assign({}, this.toc.find(x=>x.id == page.courseModuleId || x.urlName == page.courseModuleUrlPart));
            // this.root = Object.assign({}, this.toc.find(x=>x.id == page.courseModuleId || x.urlName == page.courseModuleUrlPart));
            // Object.assign(root.sessions, [root.sessions.find(x=>x.id == page.sessionId || x.urlName == page.sessionUrlPart)]);
            // Object.assign(root.sessions[0].pages, [root.sessions[0].pages.find(x=>x.id == page.pageId || x.urlName == page.pageUrlPart)]);
            let root = JSON.parse(JSON.stringify(this.toc.courseModules.find(x => x.id == page.courseModuleId || x.urlName == page.courseModuleUrlPart)));
            root.sessions = [root.sessions.find(x => x.id == page.sessionId || x.urlName == page.sessionUrlPart)];

            root.sessions[0].pages = [root.sessions[0].pages.find(x => x.id == page.pageId || x.urlName == page.pageUrlPart)];

            return root;
        }
        //TODO: Prevent double fetch of ToC through switch/debounce or cache
        this.getTableOfContent().subscribe(x => this.getPathToPage(page));
    }

    getIdFromPage(page: IPageReference): any {
        var obj = {
            CourseId: 0,
            CourseModuleId: 0,
            SessionId: 0,
            PageId: 0
        };

        if (this.toc) {
            obj.CourseId = this.toc.id;
            let root = JSON.parse(JSON.stringify(this.toc.courseModules.find(x => x.urlName == page.courseModuleUrlPart)));
            obj.CourseModuleId = root.id;
            root.sessions = [root.sessions.find(x => x.urlName == page.sessionUrlPart)];
            obj.SessionId = root.sessions[0].id;
            root.sessions[0].pages = [root.sessions[0].pages.find(x => x.urlName == page.pageUrlPart)];
            obj.PageId = root.sessions[0].pages[0].id;
            return obj;
        }
        //TODO: Prevent double fetch of ToC through switch/debounce or cache
        // this.getTableOfContent().subscribe(x => this.getPathToPage(page));
    }

    getPageContent(page: IPageReference): Observable<string> {

        //TODO Implement better loading, including dynamic data and component rendering
        let path = this.getPathToPage(page);
        if (!page.courseModuleUrlPart) {
            debugger
            page.courseModuleUrlPart = path.urlName;
            page.sessionUrlPart = path.sessions[0].urlName;
            page.pageUrlPart = path.sessions[0].pages[0].urlName;
        }
        return this.http.get(`/assets/content/${page.courseModuleUrlPart}/${page.sessionUrlPart}/${page.pageUrlPart}.html`, { responseType: 'text' });
        // .pipe(
        //     map(resp => { return { id: path.sessions[0].pages[0].id, name: path.sessions[0].pages[0].name, urlName: path.sessions[0].pages[0].urlName, htmlContent: resp}; } )
        // );
    }
    getTableOfContent(): Observable<ICourse> {
        let req = this.http.get<ICourse>('/assets/content/toc.json').pipe(
            tap(x => this.toc = x)
        );
        return req;
    }
    getTOC(): Promise<any> {
        const promise = this.http.get<ICourse>('/assets/content/toc.json')
            .toPromise()
            .then(toc => {
                this.toc = toc;
                return toc;
            });
        return promise;
    }
    constructor(private http: HttpClient) { }
}

let courseContentProviderFactory = (http: HttpClient) => {
    return new JsonContentProvider(http);
};
export let courseContentFactoryProvider =
    {
        provide: CourseContentProvider,
        useFactory: courseContentProviderFactory,
        deps: [HttpClient]
    };