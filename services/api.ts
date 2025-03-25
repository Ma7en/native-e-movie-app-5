export const TMDB_CONFIG = {
    BASE_URL: "https://api.themoviedb.org/3",
    API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
    headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`,
    },
};

export const fetchMovies = async ({
    query,
}: {
    query: string;
}): Promise<Movie[]> => {
    const endpoint = query
        ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(
              query
          )}`
        : `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`;

    const response = await fetch(endpoint, {
        method: "GET",
        headers: TMDB_CONFIG.headers,
    });

    if (!response.ok) {
        // @ts-ignore
        throw new Error(`Failed to fetch movies`, response.statusText);
    }

    const data = await response.json();
    return data.results;
};

export const fetchMovieDetails = async (
    movieId: string
): Promise<MovieDetails> => {
    try {
        const response = await fetch(
            `${TMDB_CONFIG.BASE_URL}/movie/${movieId}?api_key=${TMDB_CONFIG.API_KEY}`,
            {
                method: "GET",
                headers: TMDB_CONFIG.headers,
            }
        );

        if (!response.ok) {
            throw new Error(
                `Failed to fetch movie details: ${response.statusText}`
            );
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching movie details:", error);
        throw error;
    }
};

// const url =
//     "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc";
// const options = {
//     method: "GET",
//     headers: {
//         accept: "application/json",
//         Authorization:
//             "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMGU2OWExNjkwZTU4OWI1N2IxNzZjZTAzNDBkN2E3NiIsIm5iZiI6MTY5Njk0Mjc1MS4zNDgsInN1YiI6IjY1MjU0YTlmZDM5OWU2MDBjNjc2N2FhOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Wx9Xte9pRhXQQhyraKug7w3Yriza6IzZnsub0wa_EYo",
//     },
// };

// fetch(url, options)
//     .then((res) => res.json())
//     .then((json) => console.log(json))
//     .catch((err) => console.error(err));
