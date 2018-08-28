import { CommentViewModel } from './comment.viewmodel';
export interface ClassFeedPostViewModel {
    ClassFeedPostId: number;
    Created: Date | string;
    //UserId: string;
    PostText: string;
    ExternalResourceUrl: string;
    Name: string;
    Comments: CommentViewModel[];
}
