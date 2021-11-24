import { Injectable } from "@angular/core";
import { Post } from "./post.model";
import { Subject } from 'rxjs';

// provides this on the root level, can also add posts service to injectables in app module instead
@Injectable({providedIn:'root'})
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();
  // can use subject from rxjs instead of EventEmitter and Output

  getPosts() {
    return [...this.posts];
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  addPost(title: string, content: string) {
    const post: Post = {title: title, content: content};
    this.posts.push(post);
    this.postsUpdated.next([...this.posts]);
  }
}
