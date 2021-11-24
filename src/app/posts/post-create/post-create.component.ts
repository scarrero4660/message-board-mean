import { Component,EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PostsService } from '../posts.service';


@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent {
  enteredContent = '';
  enteredTitle = '';
  // @Output() postCreated = new EventEmitter<Post>()

  constructor(public postsService: PostsService) {}

  onAddPost(form: NgForm) {
    // console.dir(postInput);
    // this.newPost = this.enteredValue;
    // this.newPost = postInput.value;
    if(form.invalid) {
      return;
    }
    // const post: Post = {
    //   title: form.value.title,
    //   content: form.value.content
    // };
    // this.postCreated.emit(post)
    this.postsService.addPost(form.value.title,form.value.content)
    form.resetForm();
  }
}
