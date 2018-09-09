import { IPage, IPageReference, ISession, ICourseModule, ICourse, IPageModel } from "../interfaces/girls-interfaces";

export class Page implements IPage {
    htmlContent: string;
    pageReference: IPageReference;
    id: number;
    name: string;
    urlName: string;
    number: number
}

export class Session implements ISession {
    pages: IPage[];
    id: number;
    name: string;
    urlName: string;
    number: number;
}

export class CourseModule implements ICourseModule {
    sessions: ISession[];
    id: number;
    name: string;
    urlName: string;
    number: number;
}

export class Course implements ICourse {
    courseModules: ICourseModule[];
    id: number;
    name: string;
    urlName: string;
    number: number;
}

export class PageReference implements IPageReference {
    courseModuleUrlPart: string;
    sessionUrlPart: string;
    pageUrlPart: string;
    courseModuleId: number;
    sessionId: number;
    pageId: number;
}

export class PageModel implements IPageModel {
    prevPage: IPageReference;
    page: IPage;
    nextPage: IPageReference;
}