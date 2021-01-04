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
export const FETCH_ALBUM_QUERY = gql`
    query ($albumId: ID){
        getAlbum(albumId: $albumId) {
            id
            albumName
            artist
            albumDuration
            albumCover
            numberOfTracks
            tracks {
                trackName
                sound
                duration
                like
            }
        }
    }
`
export const FETCH_ALBUMS_QUERY = gql`
    query {
        getAlbums {
            id
            albumName
            artist
            albumDuration
            albumCover
            numberOfTracks
            tracks {
                id
                trackName
                sound
                duration
                like
            }
        }
    }
`