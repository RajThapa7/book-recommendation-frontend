import SectionTitle from "@/components/common/text/section-title";
import { routes } from "@/contants/routes";
import { getUser } from "@/lib/getUser";
import {
  useCosineSimilarityRecommendationMutation,
  useGetSavedBooksQuery,
  useListRelatedBooksMutation,
} from "@/store/features/book/book.api";
import Link from "next/link";
import { useEffect, useState } from "react";
import BookCard from "../book-card";

export default function BookRecommendations() {
  const { data, isLoading } = useGetSavedBooksQuery({
    id: getUser()?.userId,
  });
  const [getRelatedBook] = useListRelatedBooksMutation();
  const [cosineSimilarityRelatedBooks] =
    useCosineSimilarityRecommendationMutation();
  const [relatedJaccardBooks, setRelatedJaccardBooks] = useState<any>(null);
  const [loadingJaccard, setLoadingJaccard] = useState<boolean>(false);
  const [loadingCosineSimilarity, setLoadingCosineSimilarity] =
    useState<boolean>(false);
  const [relatedCosineBooks, setRelatedCosineBooks] = useState<any>(null);

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
          setRelatedCosineBooks(response?.data?.list?.data);
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
        <div className="grid grid-cols-1 place-items-center sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
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
      <div className="flex flex-col gap-6 mt-12">
        <SectionTitle
          text="Recommendations of books(Cosine Similarity) "
          className="text-h4"
        />
        {loadingCosineSimilarity && (
          <p className="text-lg font-semibold text-blue-400">
            Please wait a second...
          </p>
        )}
        {relatedCosineBooks && relatedCosineBooks.length > 0 ? (
          <div className="grid grid-cols-1 place-items-center sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
            {relatedCosineBooks &&
              relatedCosineBooks?.map((p: any, index: number) => (
                <BookCard
                  similarity={(p?.similarity * 100)?.toFixed(2)?.toString()}
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
        ) : (
          <>
            {!loadingCosineSimilarity && (
              <p className="text-lg text-black">
                Please add books to your save list to see recommendations.
                <Link
                  href={routes.auth.save_book}
                  className="text-blue-500 underline ml-2"
                >
                  Go to your save list
                </Link>
              </p>
            )}
          </>
        )}
      </div>
    </>
  );
}
