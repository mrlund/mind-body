import { ActionReducer, Action } from '@ngrx/store';
import * as fromGww from "../actions/gww.action";
import { ClassFeedPostViewModel, CommentViewModel } from "@app/core/models"
export interface GwwState {
    postLoadLoading: boolean;
    postLoadComplete: boolean;
    postLoadError: any;
    postCommentLoading: boolean;
    postCommentComplete: boolean;
    postCommentError: any;
    posts: ClassFeedPostViewModel[];
}

export const initialState: GwwState = {
    postLoadLoading: false,
    postLoadComplete: false,
    postLoadError: null,
    postCommentLoading: false,
    postCommentComplete: false,
    postCommentError: null,
    posts: []
};

export function reducer(state: GwwState = initialState, action: fromGww.GwwActions) {
    switch (action.type) {
        case fromGww.GET_ALL_POSTS: {
            return {
                ...state,
                postLoadLoading: true
            };
        }

        case fromGww.GET_ALL_POSTS_SUCCESS: {
            return {
                ...state,
                postLoadLoading: false,
                postLoadComplete: true,
                posts: action.payload
            };
        }

        case fromGww.GET_ALL_POSTS_FAIL: {
            return {
                ...state,
                postLoadLoading: false,
                postLoadComplete: false,
                postLoadError: action.payload
            };
        }

        case fromGww.POST_COMMENT: {
            return {
                ...state,
                postCommentLoading: true
            };
        }
        case fromGww.POST_COMMENT_SUCCESS: {
            var posts = state.posts.map(post => {
                if (
                    post.ClassFeedPostId === action.payload.ClassFeedPostId
                ) {
                    return {
                        ...post,
                        Comments: [...post.Comments, action.payload]
                    };
                }
                return post;
            });

            return {
                ...state,
                postCommentLoading: false,
                postCommentComplete: true,
                posts: posts
            };
        }
        case fromGww.POST_COMMENT_FAIL: {
            return {
                ...state,
                postCommentLoading: false,
                postCommentComplete: false,
                postCommentError: action.payload
            };
        }
        default:
            return state;
    }
}


export const getPostLoadLoading = (state: GwwState) => state.postLoadLoading;
export const getPostLoadComplete = (state: GwwState) => state.postLoadComplete;
export const getPostLoadError = (state: GwwState) => state.postLoadError;
export const getAllPosts = (state: GwwState) => state.posts;


export const getPostCommentLoading = (state: GwwState) => state.postCommentLoading;
export const getPostCommentComplete = (state: GwwState) => state.postCommentComplete;
export const getPostCommentError = (state: GwwState) => state.postCommentError;
