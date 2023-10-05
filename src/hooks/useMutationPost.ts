import { useMutation } from "react-query";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import { queryClient } from "../config/queryClient";
import { IPost } from "../config/firebasetype";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { postModalState } from "../recoil/Modal";

export const useAddPost = () => {
  const setIsModalOpen = useSetRecoilState(postModalState);
  return useMutation(
    async (newPost: { title: string; summary: string; content: string }) => {
      const postsCollection = collection(db, "Posts");
      const postData = {
        ...newPost,
        createdAt: serverTimestamp(),
      };
      return addDoc(postsCollection, postData);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("Posts");
        setIsModalOpen(false);
      },
    },
  );
};

export const useDeletePost = () => {
  const navigate = useNavigate();
  return useMutation(
    async (postId: string) => {
      const postRef = doc(db, "Posts", postId);
      await deleteDoc(postRef);
    },
    {
      onSuccess: () => {
        navigate(`/`);
        queryClient.invalidateQueries("Posts");
      },
    },
  );
};

export const useUpdatePost = () => {
  return useMutation(
    async ({
      postId,
      updatedData,
    }: {
      postId: string;
      updatedData: Partial<IPost>;
    }) => {
      const postRef = doc(db, "Posts", postId);
      await updateDoc(postRef, updatedData);
    },
    {
      onSuccess: (data, variables) => {
        queryClient.invalidateQueries("Posts");
        queryClient.invalidateQueries(["Post", variables.postId]);
      },
    },
  );
};
