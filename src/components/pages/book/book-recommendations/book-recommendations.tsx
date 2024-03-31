import SectionTitle from "@/components/common/text/section-title";
import { getUser } from "@/lib/getUser";
import {
  useCosineSimilarityRecommendationMutation,
  useGetSavedBooksQuery,
  useListRelatedBooksMutation,
} from "@/store/features/book/book.api";
import React, { useEffect, useState } from "react";
import BookCard from "../book-card";

export default function BookRecommendations() {
  const { data, isLoading } = useGetSavedBooksQuery({
    id: getUser()?.userId,
  });
  const [getRelatedBook] = useListRelatedBooksMutation();
  const [cosineSimilarityRelatedBooks] =
    useCosineSimilarityRecommendationMutation();
  const [relatedJaccardBooks, setRelatedJaccardBooks] = useState(null);
  const [loadingJaccard, setLoadingJaccard] = useState<boolean>(false);
  const [loadingCosineSimilarity, setLoadingCosineSimilarity] =
    useState<boolean>(false);
  const [relatedCosineBooks, setRelatedCosineBooks] = useState(null);

  useEffect(() => {
    setLoadingJaccard(true);
    setLoadingCosineSimilarity(true);
    const fetchRelatedBooks = async () => {
      if (data?.books) {
        try {
          const response: any = await getRelatedBook({
            books: data?.books,
          });
          setLoadingJaccard(false);
          setRelatedJaccardBooks(response?.data?.data?.slice(1, 11));
        } catch (error) {
          console.error("Error fetching related books:", error);
          setLoadingJaccard(false);
        }
      }
    };
    const fetchCosineSimilarityBooks = async () => {
      if (data?.books) {
        try {
          const response: any = await cosineSimilarityRelatedBooks({
            list: data?.books,
          });
          setLoadingCosineSimilarity(false);
          setRelatedCosineBooks(response?.data?.list?.slice(1, 11));
        } catch (error) {
          console.error("Error fetching related books:", error);
          setLoadingCosineSimilarity(false);
        }
      }
    };

    fetchRelatedBooks();
    fetchCosineSimilarityBooks();
  }, [data]);
  if (isLoading) {
    return <p>loading....</p>;
  }
  return (
    <>
      <div className="flex flex-col gap-6">
        <SectionTitle
          text="Recommendations of books(Jaccard Similarity) "
          className="text-h4"
        />
        {loadingJaccard && (
          <p className="text-lg font-semibold text-blue-400">
            Please wait a second...
          </p>
        )}
        <div className="flex flex-wrap gap-12">
          {relatedJaccardBooks &&
            relatedJaccardBooks?.map((p: any, index: number) => (
              <BookCard
                similarity={(p?.averageSimilarity * 100)
                  ?.toFixed(2)
                  ?.toString()}
                key={index + "recommend"}
                title={p?.title}
                rating={p?.average_rating}
                image={p?.image_url}
                author={p?.authors}
                language={p?.language_code}
                date={p?.original_publication_year}
                id={p?._id}
                bookId={p?.id}
              />
            ))}
        </div>
      </div>
      <div className="flex flex-col gap-6">
        <SectionTitle
          text="Recommendations of books(Cosine Similarity) "
          className="text-h4"
        />
        {loadingCosineSimilarity && (
          <p className="text-lg font-semibold text-blue-400">
            Please wait a second...
          </p>
        )}
        <div className="flex flex-wrap gap-12">
          {relatedCosineBooks &&
            relatedCosineBooks?.map((p: any, index: number) => (
              <BookCard
                similarity={(p?.similarity * 100)
                  ?.toFixed(2)
                  ?.toString()}
                key={index + "recommend"}
                title={p?.book?.title}
                rating={p?.book?.average_rating}
                image={p?.book?.image_url}
                author={p?.book?.authors}
                language={p?.book?.language_code}
                date={p?.book?.original_publication_year}
                id={p?.book?._id}
                bookId={p?.book?.id}
              />
            ))}
        </div>
      </div>
    </>
  );
}
