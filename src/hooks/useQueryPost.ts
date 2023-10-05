import { useQuery } from "react-query";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import { Post, postConverter } from "../config/firebasetype";

export const usePosts = () => {
  return useQuery<Post[]>("Posts", async (): Promise<Post[]> => {
    const postCollection = collection(db, "Posts").withConverter(postConverter);

    const postQuery = query(postCollection, orderBy("createdAt", "desc"));

    const postSnapshot = await getDocs(postQuery);
    return postSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  });
};

export const usePost = (id: string) => {
  return useQuery<Post>(["Post", id], async (): Promise<Post> => {
    const postRef = doc(db, "Posts", id).withConverter(postConverter);
    const postSnapshot = await getDoc(postRef);
    if (!postSnapshot.exists()) {
      throw new Error("Post not found");
    }
    return postSnapshot.data();
  });
};
