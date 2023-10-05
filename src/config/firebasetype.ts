import {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
  Timestamp,
} from "firebase/firestore";

export interface IPost {
  id: string;
  title: string;
  content: string;
  summary: string;
  createdAt: Timestamp;
}

export interface IComment {
  id: string;
  content: string;
  name: string;
  createdAt: Timestamp;
}

export class Post {
  constructor(
    public id: string,
    public title: string,
    public content: string,
    public summary: string,
    public createdAt: Timestamp,
  ) {}
}

export const postConverter: FirestoreDataConverter<Post> = {
  toFirestore: (postData: Post): DocumentData => {
    return {
      title: postData.title,
      content: postData.content,
      summary: postData.summary,
      createdAt: postData.createdAt,
    };
  },
  fromFirestore: (
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions,
  ): Post => {
    const data = snapshot.data(options);
    return new Post(
      snapshot.id,
      data.title,
      data.content,
      data.summary,
      data.createdAt,
    );
  },
};

export class Comment {
  constructor(
    public id: string,
    public name: string,
    public content: string,
    public createdAt: Timestamp,
  ) {}
}

export const commentConverter: FirestoreDataConverter<Comment> = {
  toFirestore: (commentData: Comment): DocumentData => {
    return {
      name: commentData.name,
      content: commentData.content,
      createdAt: commentData.createdAt,
    };
  },
  fromFirestore: (
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions,
  ): Comment => {
    const data = snapshot.data(options);
    return new Comment(snapshot.id, data.name, data.content, data.createdAt);
  },
};
