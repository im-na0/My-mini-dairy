import { useEffect } from "react";
import { useQuery, useQueryClient } from "react-query";
import {
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import { commentConverter } from "../config/firebasetype";

async function fetchComments(postId: string) {
  const q = query(
    collection(db, "Comments").withConverter(commentConverter),
    orderBy("createdAt"),
    where("postId", "==", postId),
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => doc.data());
}

export const useComments = (postId: string) => {
  const queryClient = useQueryClient();

  // useQuery 캐싱처리
  const { data, isLoading, isError, ...queryInfo } = useQuery(
    ["Comments", postId],
    () => fetchComments(postId),
    {
      staleTime: 1000 * 60 * 5, // 5분 동안 재요청되지 않음
    },
  );

  // onSnapshot 실시간 업데이트
  useEffect(() => {
    if (!postId) return;

    const commentsRef = query(
      collection(db, "Comments").withConverter(commentConverter),
      where("postId", "==", postId),
    );

    const unsubscribe = onSnapshot(commentsRef, (snapshot) => {
      const newComments = snapshot.docs.map((doc) => doc.data());
      queryClient.setQueryData(["Comments", postId], newComments); // 변경된 데이터 즉각 UI에 반영
    });

    return () => unsubscribe();
  }, [postId, queryClient]);

  return { data, isLoading, isError, ...queryInfo };
};
