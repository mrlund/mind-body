
import { Action } from '@ngrx/store';

export const GET_ALL_POSTS = '[GWW] Get All Posts';
export const GET_ALL_POSTS_SUCCESS = '[GWW] Get All Posts Success';
export const GET_ALL_POSTS_FAIL = '[GWW] Get All Posts Fail';

export const POST_COMMENT = '[GWW] Post Comment';
export const POST_COMMENT_SUCCESS = '[GWW] Post Comment Success';
export const POST_COMMENT_FAIL = '[GWW] Post Comment Fail';


export class GetAllPosts implements Action {
    readonly type = GET_ALL_POSTS;
}

export class GetAllPostsSuccess implements Action {
    readonly type = GET_ALL_POSTS_SUCCESS;
    constructor(public payload: any) { }
}

export class GetAllPostsFail implements Action {
    readonly type = GET_ALL_POSTS_FAIL;
    constructor(public payload: any) { }
}

export class PostComment implements Action {
    readonly type = POST_COMMENT;
    constructor(public payload: { model: any, postId: number }) { }
}

export class PostCommentSuccess implements Action {
    readonly type = POST_COMMENT_SUCCESS;
    constructor(public payload: any) { }
}

export class PostCommentFail implements Action {
    readonly type = POST_COMMENT_FAIL;
    constructor(public payload: any) { }
}

export type GwwActions =
    GetAllPosts |
    GetAllPostsSuccess |
    GetAllPostsFail
    | PostComment
    | PostCommentSuccess
    | PostCommentFail;