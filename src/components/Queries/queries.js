import gql from "graphql-tag";

// export const TracksQuery = gql`
//     query TracksQuery($name: String){
//         movies(name: $name){
//             id
//             name
//             artist
//             sound
//             cover
//             duration
//             like
//         }
//     }
// `
export const FETCH_PLAYLIST_QUERY = gql`
    {
        getPlaylist {
            id
            name
            artist
            sound
            cover
            duration
            like
        }
    }
`