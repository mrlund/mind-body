import { IPage, IPageReference, ISession, ICourseModule, ICourse, IPageModel } from "../interfaces/girls-interfaces";

export class Page implements IPage {
    htmlContent: string;
    pageReference: IPageReference;
    id: number;
    name: string;
    urlName: string;
}

export class Session implements ISession {
    pages: IPage[];
    id: number;
    name: string;
    urlName: string;
}

export class CourseModule implements ICourseModule {
    sessions: ISession[];
    id: number;
    name: string;
    urlName: string;
}

export class Course implements ICourse {
    courseModules: ICourseModule[];
    id: number;
    name: string;
    urlName: string;
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