import { ICourseModule, IPageModel } from "../interfaces/girls-interfaces";

export interface TableOfContentState {
    courseModules: ICourseModule[];
}
export interface AppState {
    user: Array<any>;
    tableOfContent: ICourseModule[];
    loading : boolean;
    page: IPageModel;

}