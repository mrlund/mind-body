import { Observable } from "rxjs";

export interface ICoursePart {
    id: number,
    name: string,
    urlName: string
}
export interface IPage extends ICoursePart {
    htmlContent: string;
    pageReference: IPageReference;
}

export interface ISession extends ICoursePart {
    pages: Array<IPage>;
}

export interface ICourseModule extends ICoursePart {
    sessions : Array<ISession>;
}
export interface ICourse extends ICoursePart {
    courseModules: Array<ICourseModule>;
}
export interface IPageModel {
    prevPage: IPageReference;
    page: IPage;
    nextPage: IPageReference;
}

//TODO: Add UserDataProvider for profile and saving datas
export interface ICourseContentProvider {
    
    getTableOfContent() : Observable<ICourse>;

    getPageContent(page: IPageReference) : Observable<string>;

    getNextAndPrevPage(page: IPageReference) : Observable<IPageModel>;

}
export interface IPageReference {
    courseModuleUrlPart: string;
    sessionUrlPart: string;
    pageUrlPart: string;

    courseModuleId: number;
    sessionId: number;
    pageId: number;

}

export interface IPageResult {
    courseModuleId: number;
    sessionId: number;
    pageId: number;
    isComplete: boolean;
}

export interface IUserProgressProvider {
    getCompletedPages(): Observable<IPageResult[]>;
    setPageComplete(result: IPageResult): boolean;
}

//Class provided for DI purposes only
export class CourseContentProvider implements ICourseContentProvider {

    getPageContent(page: IPageReference): Observable<string> {
        throw new Error("Method not implemented.");
    }

    getNextAndPrevPage(page: IPageReference) : Observable<IPageModel> {
        throw new Error("Method not implemented.");
    }
    
    getTableOfContent() : Observable<ICourse> {
        return Observable.create(()=>new Array<ICourseModule>());
    }

}