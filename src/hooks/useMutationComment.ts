import { useMutation, useQueryClient } from "react-query";
import {
  collection,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../config/firebaseConfig";

export const useAddComment = () => {
  return useMutation(
    async ({
      postId,
      name,
      content,
    }: {
      postId: string;
      name: string;
      content: string;
    }) => {
      const commentsCollection = collection(db, "Comments");
      return addDoc(commentsCollection, {
        postId,
        name,
        content,
        createdAt: new Date(),
      });
    },
  );
};

export const useDeleteComment = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async (commentId: string) => {
      const commentRef = doc(db, "Comments", commentId);
      await deleteDoc(commentRef);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("Comments");
      },
    },
  );
};

export const useUpdateComment = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async ({
      commentId,
      name,
      content,
    }: {
      commentId: string;
      name: string;
      content: string;
    }) => {
      const commentRef = doc(db, "Comments", commentId);
      return updateDoc(commentRef, {
        content,
        name,
        updatedAt: new Date(),
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("Comments");
      },
    },
  );
};
